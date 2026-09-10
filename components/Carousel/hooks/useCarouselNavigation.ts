"use client";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
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
    const viewportRef = useRef<HTMLDivElement>(null);
    const railRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);

  const [hasOverflow, setHasOverflow] =
    useState(false);

  const [canScrollPrevious, setCanScrollPrevious] =
    useState(false);

  const [canScrollNext, setCanScrollNext] =
    useState(false);

  const getItems = useCallback(() => {
    const track = trackRef.current;

    if (!track) {
      return [];
    }

    return Array.from(track.children).filter(
      (element): element is HTMLElement =>
        element instanceof HTMLElement,
    );
  }, []);

  const getScrollTargets = useCallback(() => {
    const items = getItems();
    const firstItem = items[0];

    if (!firstItem) {
      return [];
    }

    return items.map(
      (item) =>
        item.offsetLeft - firstItem.offsetLeft,
    );
  }, [getItems]);

  const getMaximumScrollLeft = useCallback(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return 0;
    }

    return Math.max(
      viewport.scrollWidth - viewport.clientWidth,
      0,
    );
  }, []);

  const isAtBeginning = useCallback(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return true;
    }

    return (
      viewport.scrollLeft <= EDGE_TOLERANCE
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
      maximumScrollLeft - EDGE_TOLERANCE
    );
  }, [getMaximumScrollLeft]);

  const updateCarouselState = useCallback(() => {
    const maximumScrollLeft =
      getMaximumScrollLeft();

    const doesOverflow =
      maximumScrollLeft > EDGE_TOLERANCE;

    setHasOverflow(doesOverflow);

    if (!doesOverflow) {
      setCanScrollPrevious(false);
      setCanScrollNext(false);
      return;
    }

    if (loop) {
      setCanScrollPrevious(true);
      setCanScrollNext(true);
      return;
    }

    setCanScrollPrevious(!isAtBeginning());
    setCanScrollNext(!isAtEnd());
  }, [
    getMaximumScrollLeft,
    isAtBeginning,
    isAtEnd,
    loop,
  ]);

  const getNearestIndex = useCallback(
    (targets: number[]) => {
      const viewport = viewportRef.current;

      if (!viewport || !targets.length) {
        return 0;
      }

      let nearestIndex = 0;
      let nearestDistance =
        Number.POSITIVE_INFINITY;

      targets.forEach((target, index) => {
        const distance = Math.abs(
          target - viewport.scrollLeft,
        );

        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = index;
        }
      });

      return nearestIndex;
    },
    [],
  );

  const getEffectiveStep = useCallback(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return step;
    }

    return viewport.clientWidth < MOBILE_BREAKPOINT
      ? mobileStep
      : step;
  }, [mobileStep, step]);

  const scrollToIndex = useCallback(
    (
      index: number,
      behavior: ScrollBehavior = "smooth",
    ) => {
      const viewport = viewportRef.current;
      const targets = getScrollTargets();

      if (!viewport || !targets.length) {
        return;
      }

      const boundedIndex = Math.min(
        Math.max(index, 0),
        targets.length - 1,
      );

      const targetLeft = targets[boundedIndex];

      if (targetLeft === undefined) {
        return;
      }

      viewport.scrollTo({
        left: targetLeft,
        behavior,
      });
    },
    [getScrollTargets],
  );

  const scrollToBeginning = useCallback(
    (
      behavior: ScrollBehavior = "smooth",
    ) => {
      const viewport = viewportRef.current;

      if (!viewport) {
        return;
      }

      viewport.scrollTo({
        left: 0,
        behavior,
      });
    },
    [],
  );

  const scrollToEnd = useCallback(
    (
      behavior: ScrollBehavior = "smooth",
    ) => {
      const viewport = viewportRef.current;

      if (!viewport) {
        return;
      }

      viewport.scrollTo({
        left: getMaximumScrollLeft(),
        behavior,
      });
    },
    [getMaximumScrollLeft],
  );

  const scroll = useCallback(
    (
      direction: CarouselDirection,
      behavior: ScrollBehavior = "smooth",
    ) => {
      const targets = getScrollTargets();

      if (!targets.length) {
        return;
      }

      if (
        direction === "next" &&
        isAtEnd()
      ) {
        if (loop) {
          scrollToBeginning(behavior);
        }

        return;
      }

      if (
        direction === "previous" &&
        isAtBeginning()
      ) {
        if (loop) {
          scrollToEnd(behavior);
        }

        return;
      }

      const nearestIndex =
        getNearestIndex(targets);

      const effectiveStep =
        getEffectiveStep();

      const targetIndex =
        direction === "next"
          ? Math.min(
              nearestIndex + effectiveStep,
              targets.length - 1,
            )
          : Math.max(
              nearestIndex - effectiveStep,
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
      scrollToBeginning,
      scrollToEnd,
      scrollToIndex,
    ],
  );

  useEffect(() => {
    const viewport = viewportRef.current;
const rail = railRef.current;
const track = trackRef.current;

if (!viewport || !rail || !track) {
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