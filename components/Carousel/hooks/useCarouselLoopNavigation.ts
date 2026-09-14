"use client";

import {
  useCallback,
  type RefObject,
} from "react";

import type { CarouselDirection } from "../types";

type UseCarouselLoopNavigationOptions = {
  viewportRef: RefObject<HTMLDivElement | null>;
  trackRef: RefObject<HTMLUListElement | null>;

  getScrollTargets: () => number[];

  getNearestIndex: (
    targets: number[],
    position?: number,
  ) => number;

  getEffectiveStep: () => number;

  scrollToPosition: (
    left: number,
    behavior: ScrollBehavior,
  ) => void;
};

const EDGE_TOLERANCE = 2;

function getWrappedIndex(
  index: number,
  itemCount: number,
) {
  if (itemCount <= 0) {
    return 0;
  }

  return (
    ((index % itemCount) + itemCount) %
    itemCount
  );
}

export function useCarouselLoopNavigation({
  viewportRef,
  trackRef,
  getScrollTargets,
  getNearestIndex,
  getEffectiveStep,
  scrollToPosition,
}: UseCarouselLoopNavigationOptions) {
  const getCycleWidth = useCallback(() => {
    const track = trackRef.current;

    if (!track) {
      return 0;
    }

    return track.getBoundingClientRect().width;
  }, [trackRef]);

  const normalizePosition = useCallback(
    (
      position: number,
      cycleWidth: number,
    ) => {
      if (cycleWidth <= 0) {
        return 0;
      }

      return (
        ((position % cycleWidth) +
          cycleWidth) %
        cycleWidth
      );
    },
    [],
  );

  const scrollNextLooping = useCallback(
    (
      currentPosition: number,
      normalizedPosition: number,
      nearestIndex: number,
      targets: number[],
      cycleWidth: number,
      effectiveStep: number,
      behavior: ScrollBehavior,
    ) => {
      const viewport = viewportRef.current;

      if (!viewport) {
        return;
      }

      const rawTargetIndex =
        nearestIndex + effectiveStep;

      const targetIndex = getWrappedIndex(
        rawTargetIndex,
        targets.length,
      );

      const target = targets[targetIndex];

      if (target === undefined) {
        return;
      }

      /*
       * If autonomous motion currently has the
       * viewport inside the continuation copy,
       * first normalise to the equivalent position
       * in the primary cycle.
       *
       * The two positions look identical.
       */
      if (
        Math.abs(
          currentPosition -
            normalizedPosition,
        ) > EDGE_TOLERANCE
      ) {
        viewport.scrollLeft =
          normalizedPosition;
      }

      const crossedBoundary =
        rawTargetIndex >= targets.length;

      const targetPosition =
        crossedBoundary
          ? target + cycleWidth
          : target;

      scrollToPosition(
        targetPosition,
        behavior,
      );
    },
    [
      scrollToPosition,
      viewportRef,
    ],
  );

  const scrollPreviousLooping = useCallback(
    (
      currentPosition: number,
      normalizedPosition: number,
      nearestIndex: number,
      targets: number[],
      cycleWidth: number,
      effectiveStep: number,
      behavior: ScrollBehavior,
    ) => {
      const viewport = viewportRef.current;

      if (!viewport) {
        return;
      }

      const rawTargetIndex =
        nearestIndex - effectiveStep;

      const targetIndex = getWrappedIndex(
        rawTargetIndex,
        targets.length,
      );

      const target = targets[targetIndex];

      if (target === undefined) {
        return;
      }

      const crossedBoundary =
        rawTargetIndex < 0;

      /*
       * Moving backwards across the beginning:
       *
       *   primary A ← primary E
       *
       * first place the viewport at the visually
       * equivalent continuation position.
       *
       * Then smooth-scroll backwards into the end
       * of the primary track.
       */
      if (crossedBoundary) {
        viewport.scrollLeft =
          normalizedPosition + cycleWidth;

        scrollToPosition(
          target,
          behavior,
        );

        return;
      }

      if (
        Math.abs(
          currentPosition -
            normalizedPosition,
        ) > EDGE_TOLERANCE
      ) {
        viewport.scrollLeft =
          normalizedPosition;
      }

      scrollToPosition(
        target,
        behavior,
      );
    },
    [
      scrollToPosition,
      viewportRef,
    ],
  );

  const scrollLooping = useCallback(
    (
      direction: CarouselDirection,
      behavior: ScrollBehavior = "smooth",
    ) => {
      const viewport = viewportRef.current;

      const targets =
        getScrollTargets();

      const cycleWidth =
        getCycleWidth();

      if (
        !viewport ||
        !targets.length ||
        cycleWidth <= 0
      ) {
        return;
      }

      const currentPosition =
        viewport.scrollLeft;

      const normalizedPosition =
        normalizePosition(
          currentPosition,
          cycleWidth,
        );

      const nearestIndex =
        getNearestIndex(
          targets,
          normalizedPosition,
        );

      const effectiveStep =
        getEffectiveStep();

      if (direction === "next") {
        scrollNextLooping(
          currentPosition,
          normalizedPosition,
          nearestIndex,
          targets,
          cycleWidth,
          effectiveStep,
          behavior,
        );

        return;
      }

      scrollPreviousLooping(
        currentPosition,
        normalizedPosition,
        nearestIndex,
        targets,
        cycleWidth,
        effectiveStep,
        behavior,
      );
    },
    [
      getCycleWidth,
      getEffectiveStep,
      getNearestIndex,
      getScrollTargets,
      normalizePosition,
      scrollNextLooping,
      scrollPreviousLooping,
      viewportRef,
    ],
  );

  return {
    getCycleWidth,
    scrollLooping,
  };
}