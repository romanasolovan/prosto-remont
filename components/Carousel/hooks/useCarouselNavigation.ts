"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { useCarouselLoopNavigation } from "./useCarouselLoopNavigation";

import type { CarouselDirection } from "../types";

type UseCarouselNavigationOptions = {
  itemCount: number;
  step: number;
  mobileStep: number;
  loop: boolean;
};

const EDGE_TOLERANCE = 2;
const MOBILE_BREAKPOINT = 480;

export function useCarouselNavigation({
  itemCount,
  step,
  mobileStep,
  loop,
}: UseCarouselNavigationOptions) {
  const viewportRef =
    useRef<HTMLDivElement>(null);

  const railRef =
    useRef<HTMLDivElement>(null);

  const trackRef =
    useRef<HTMLUListElement>(null);

  const [hasOverflow, setHasOverflow] =
    useState(false);

  const [
    canScrollPrevious,
    setCanScrollPrevious,
  ] = useState(false);

  const [
    canScrollNext,
    setCanScrollNext,
  ] = useState(false);

  const getItems = useCallback(() => {
    const track = trackRef.current;

    if (!track) {
      return [];
    }

    return Array.from(
      track.children,
    ).filter(
      (
        element,
      ): element is HTMLElement =>
        element instanceof HTMLElement,
    );
  }, []);

  const getScrollTargets =
    useCallback(() => {
      const items = getItems();
      const firstItem = items[0];

      if (!firstItem) {
        return [];
      }

      return items.map(
        (item) =>
          item.offsetLeft -
          firstItem.offsetLeft,
      );
    }, [getItems]);

  const getMaximumScrollLeft =
    useCallback(() => {
      const viewport =
        viewportRef.current;

      if (!viewport) {
        return 0;
      }

      return Math.max(
        viewport.scrollWidth -
          viewport.clientWidth,
        0,
      );
    }, []);

  const isAtBeginning = useCallback(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return true;
    }

    return (
      viewport.scrollLeft <=
      EDGE_TOLERANCE
    );
  }, []);

  const isAtEnd = useCallback(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return true;
    }

    const maximumScrollLeft =
      getMaximumScrollLeft();

    return (
      viewport.scrollLeft >=
      maximumScrollLeft -
        EDGE_TOLERANCE
    );
  }, [getMaximumScrollLeft]);

  const updateCarouselState =
    useCallback(() => {
      const maximumScrollLeft =
        getMaximumScrollLeft();

      const doesOverflow =
        maximumScrollLeft >
        EDGE_TOLERANCE;

      setHasOverflow(doesOverflow);

      if (!doesOverflow) {
        setCanScrollPrevious(false);
        setCanScrollNext(false);

        return;
      }

      /*
       * Looping carousels have no logical
       * beginning or end.
       */
      if (loop) {
        setCanScrollPrevious(true);
        setCanScrollNext(true);

        return;
      }

      setCanScrollPrevious(
        !isAtBeginning(),
      );

      setCanScrollNext(
        !isAtEnd(),
      );
    }, [
      getMaximumScrollLeft,
      isAtBeginning,
      isAtEnd,
      loop,
    ]);

  const getNearestIndex = useCallback(
    (
      targets: number[],
      position?: number,
    ) => {
      const viewport =
        viewportRef.current;

      if (
        !viewport ||
        !targets.length
      ) {
        return 0;
      }

      const positionToCompare =
        position ??
        viewport.scrollLeft;

      let nearestIndex = 0;

      let nearestDistance =
        Number.POSITIVE_INFINITY;

      targets.forEach(
        (target, index) => {
          const distance = Math.abs(
            target -
              positionToCompare,
          );

          if (
            distance <
            nearestDistance
          ) {
            nearestDistance =
              distance;

            nearestIndex = index;
          }
        },
      );

      return nearestIndex;
    },
    [],
  );

  const getEffectiveStep =
    useCallback(() => {
      const viewport =
        viewportRef.current;

      if (!viewport) {
        return step;
      }

      return viewport.clientWidth <
        MOBILE_BREAKPOINT
        ? mobileStep
        : step;
    }, [
      mobileStep,
      step,
    ]);

  const scrollToPosition =
    useCallback(
      (
        left: number,
        behavior: ScrollBehavior,
      ) => {
        const viewport =
          viewportRef.current;

        if (!viewport) {
          return;
        }

        viewport.scrollTo({
          left,
          behavior,
        });
      },
      [],
    );

  const scrollToIndex =
    useCallback(
      (
        index: number,
        behavior: ScrollBehavior = "smooth",
      ) => {
        const targets =
          getScrollTargets();

        if (!targets.length) {
          return;
        }

        const boundedIndex = Math.min(
          Math.max(index, 0),
          targets.length - 1,
        );

        const targetLeft =
          targets[boundedIndex];

        if (targetLeft === undefined) {
          return;
        }

        scrollToPosition(
          targetLeft,
          behavior,
        );
      },
      [
        getScrollTargets,
        scrollToPosition,
      ],
    );

  const scrollToBeginning =
    useCallback(
      (
        behavior: ScrollBehavior = "smooth",
      ) => {
        scrollToPosition(
          0,
          behavior,
        );
      },
      [scrollToPosition],
    );

  const scrollToEnd =
    useCallback(
      (
        behavior: ScrollBehavior = "smooth",
      ) => {
        scrollToPosition(
          getMaximumScrollLeft(),
          behavior,
        );
      },
      [
        getMaximumScrollLeft,
        scrollToPosition,
      ],
    );

  /*
   * Infinite-loop arrow mathematics now lives
   * in its own focused hook.
   */
  const {
    scrollLooping,
  } = useCarouselLoopNavigation({
    viewportRef,
    trackRef,

    getScrollTargets,
    getNearestIndex,
    getEffectiveStep,
    scrollToPosition,
  });

  const scroll = useCallback(
    (
      direction: CarouselDirection,
      behavior: ScrollBehavior = "smooth",
    ) => {
      if (loop) {
        scrollLooping(
          direction,
          behavior,
        );

        return;
      }

      const targets =
        getScrollTargets();

      if (!targets.length) {
        return;
      }

      if (
        direction === "next" &&
        isAtEnd()
      ) {
        return;
      }

      if (
        direction === "previous" &&
        isAtBeginning()
      ) {
        return;
      }

      const nearestIndex =
        getNearestIndex(targets);

      const effectiveStep =
        getEffectiveStep();

      const targetIndex =
        direction === "next"
          ? Math.min(
              nearestIndex +
                effectiveStep,
              targets.length - 1,
            )
          : Math.max(
              nearestIndex -
                effectiveStep,
              0,
            );

      scrollToIndex(
        targetIndex,
        behavior,
      );
    },
    [
      getEffectiveStep,
      getNearestIndex,
      getScrollTargets,
      isAtBeginning,
      isAtEnd,
      loop,
      scrollLooping,
      scrollToIndex,
    ],
  );

  useEffect(() => {
    const viewport =
      viewportRef.current;

    const rail =
      railRef.current;

    const track =
      trackRef.current;

    if (
      !viewport ||
      !rail ||
      !track
    ) {
      return;
    }

    const handleScroll = () => {
      updateCarouselState();
    };

    updateCarouselState();

    viewport.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      },
    );

    const resizeObserver =
      new ResizeObserver(() => {
        updateCarouselState();
      });

    resizeObserver.observe(viewport);
    resizeObserver.observe(rail);
    resizeObserver.observe(track);

    return () => {
      viewport.removeEventListener(
        "scroll",
        handleScroll,
      );

      resizeObserver.disconnect();
    };
  }, [
    itemCount,
    updateCarouselState,
  ]);

  return {
    viewportRef,
    railRef,
    trackRef,

    hasOverflow,
    canScrollPrevious,
    canScrollNext,

    getMaximumScrollLeft,
    isAtBeginning,
    isAtEnd,
    getScrollTargets,
    getNearestIndex,
    getEffectiveStep,

    scroll,
    scrollToIndex,
    scrollToBeginning,
    scrollToEnd,
  };
}