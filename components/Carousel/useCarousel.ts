"use client";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type PointerEvent,
} from "react";
import type { CarouselDirection } from "./types";

type UseCarouselOptions = {
  itemCount: number;
  autoplay: boolean;
  autoplayDelay: number;
  isExternallyPaused: boolean;
};

const EDGE_TOLERANCE = 2;

export function useCarousel({
  itemCount,
  autoplay,
  autoplayDelay,
  isExternallyPaused,
}: UseCarouselOptions) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);

  const [hasOverflow, setHasOverflow] =
    useState(false);

  const [canScrollPrevious, setCanScrollPrevious] =
    useState(false);

  const [canScrollNext, setCanScrollNext] =
    useState(false);

  const [isPointerInside, setIsPointerInside] =
    useState(false);

  const [isFocusInside, setIsFocusInside] =
    useState(false);

  const [isTouching, setIsTouching] =
    useState(false);

  const [isDocumentHidden, setIsDocumentHidden] =
    useState(false);

  const [prefersReducedMotion, setPrefersReducedMotion] =
    useState(false);

  const [interactionVersion, setInteractionVersion] =
    useState(0);

  const markInteraction = useCallback(() => {
    setInteractionVersion((current) => current + 1);
  }, []);

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

  const updateCarouselState = useCallback(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    const maximumScrollLeft =
      viewport.scrollWidth - viewport.clientWidth;

    const doesOverflow =
      maximumScrollLeft > EDGE_TOLERANCE;

    setHasOverflow(doesOverflow);

    setCanScrollPrevious(
      doesOverflow &&
        viewport.scrollLeft > EDGE_TOLERANCE,
    );

    setCanScrollNext(
      doesOverflow &&
        viewport.scrollLeft <
          maximumScrollLeft - EDGE_TOLERANCE,
    );
  }, []);

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

  const scroll = useCallback(
    (direction: CarouselDirection) => {
      const targets = getScrollTargets();

      if (!targets.length) {
        return;
      }

      const nearestIndex =
        getNearestIndex(targets);

      const targetIndex =
        direction === "next"
          ? Math.min(
              nearestIndex + 1,
              targets.length - 1,
            )
          : Math.max(nearestIndex - 1, 0);

      scrollToIndex(targetIndex);
    },
    [
      getNearestIndex,
      getScrollTargets,
      scrollToIndex,
    ],
  );

  const scrollPrevious = useCallback(() => {
    markInteraction();
    scroll("previous");
  }, [markInteraction, scroll]);

  const scrollNext = useCallback(() => {
    markInteraction();
    scroll("next");
  }, [markInteraction, scroll]);

  const handlePointerEnter = useCallback(() => {
    setIsPointerInside(true);
  }, []);

  const handlePointerLeave = useCallback(() => {
    setIsPointerInside(false);
    setIsTouching(false);
    markInteraction();
  }, [markInteraction]);

  const handlePointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (event.pointerType === "touch") {
        setIsTouching(true);
      }

      markInteraction();
    },
    [markInteraction],
  );

  const handlePointerUp = useCallback(() => {
    setIsTouching(false);
    markInteraction();
  }, [markInteraction]);

  const handlePointerCancel = useCallback(() => {
    setIsTouching(false);
    markInteraction();
  }, [markInteraction]);

  const handleFocusCapture = useCallback(() => {
    setIsFocusInside(true);
  }, []);

  const handleBlurCapture = useCallback(
    (event: FocusEvent<HTMLDivElement>) => {
      const nextFocusedElement =
        event.relatedTarget;

      if (
        !(nextFocusedElement instanceof Node) ||
        !event.currentTarget.contains(
          nextFocusedElement,
        )
      ) {
        setIsFocusInside(false);
        markInteraction();
      }
    },
    [markInteraction],
  );

  const handleWheel = useCallback(() => {
    markInteraction();
  }, [markInteraction]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!viewport || !track) {
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

    const resizeObserver = new ResizeObserver(() => {
      updateCarouselState();
    });

    resizeObserver.observe(viewport);
    resizeObserver.observe(track);

    return () => {
      viewport.removeEventListener(
        "scroll",
        handleScroll,
      );

      resizeObserver.disconnect();
    };
  }, [itemCount, updateCarouselState]);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const updatePreference = () => {
      setPrefersReducedMotion(
        mediaQuery.matches,
      );
    };

    updatePreference();

    mediaQuery.addEventListener(
      "change",
      updatePreference,
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        updatePreference,
      );
    };
  }, []);

  useEffect(() => {
    const updateVisibility = () => {
      setIsDocumentHidden(document.hidden);
    };

    updateVisibility();

    document.addEventListener(
      "visibilitychange",
      updateVisibility,
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        updateVisibility,
      );
    };
  }, []);

  const shouldPauseAutoplay =
    !autoplay ||
    !hasOverflow ||
    itemCount <= 1 ||
    isExternallyPaused ||
    isPointerInside ||
    isFocusInside ||
    isTouching ||
    isDocumentHidden ||
    prefersReducedMotion;

  useEffect(() => {
    if (shouldPauseAutoplay) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      const targets = getScrollTargets();

      if (!targets.length) {
        return;
      }

      const nearestIndex =
        getNearestIndex(targets);

      const isLastItem =
        nearestIndex >= targets.length - 1;

      if (isLastItem) {
        scrollToIndex(0);
        return;
      }

      scrollToIndex(nearestIndex + 1);
    }, autoplayDelay);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [
    autoplayDelay,
    getNearestIndex,
    getScrollTargets,
    interactionVersion,
    scrollToIndex,
    shouldPauseAutoplay,
  ]);

  return {
    viewportRef,
    trackRef,

    hasOverflow,
    canScrollPrevious,
    canScrollNext,

    scrollPrevious,
    scrollNext,

    handlePointerEnter,
    handlePointerLeave,
    handlePointerDown,
    handlePointerUp,
    handlePointerCancel,
    handleFocusCapture,
    handleBlurCapture,
    handleWheel,
  };
}