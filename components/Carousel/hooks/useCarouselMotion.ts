"use client";

import {
  useEffect,
  useRef,
  type RefObject,
} from "react";

export type CarouselMotionMode =
  | "step"
  | "continuous";

type UseCarouselMotionOptions = {
  viewportRef: RefObject<HTMLDivElement | null>;
  trackRef: RefObject<HTMLUListElement | null>;

  enabled: boolean;
  hasOverflow: boolean;
  itemCount: number;

  mode: CarouselMotionMode;

  autoplayDelay: number;
  continuousSpeed: number;
  startDelay: number;
  resumeDelay: number;

  isPaused: boolean;
  interactionVersion: number;

  loop: boolean;

  scrollNext: () => void;
};

export function useCarouselMotion({
  viewportRef,
  trackRef,

  enabled,
  hasOverflow,
  itemCount,

  mode,

  autoplayDelay,
  continuousSpeed,
  startDelay,
  resumeDelay,

  isPaused,
  interactionVersion,

  loop,

  scrollNext,
}: UseCarouselMotionOptions) {
  const hasStartedRef = useRef(false);

  const isAutoMoving =
    enabled &&
    hasOverflow &&
    itemCount > 1 &&
    mode === "continuous" &&
    !isPaused;

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;

    const canMove =
      enabled &&
      hasOverflow &&
      itemCount > 1 &&
      !isPaused;

    if (!viewport || !track || !canMove) {
      return;
    }

    const delay = hasStartedRef.current
      ? resumeDelay
      : startDelay;

    if (mode === "step") {
      let timeoutId: number | null = null;

      const scheduleNext = () => {
        timeoutId = window.setTimeout(() => {
          scrollNext();
          scheduleNext();
        }, autoplayDelay);
      };

      const startTimeoutId =
        window.setTimeout(() => {
          hasStartedRef.current = true;
          scheduleNext();
        }, delay);

      return () => {
        window.clearTimeout(startTimeoutId);

        if (timeoutId !== null) {
          window.clearTimeout(timeoutId);
        }
      };
    }

    let animationFrameId: number | null = null;
    let previousTimestamp: number | null = null;

    const getCycleWidth = () =>
      track.getBoundingClientRect().width;

    const initialCycleWidth = getCycleWidth();

    if (initialCycleWidth <= 0) {
      return;
    }

    let currentPosition =
      viewport.scrollLeft % initialCycleWidth;

    viewport.scrollLeft = currentPosition;

    const move = (timestamp: number) => {
      if (previousTimestamp === null) {
        previousTimestamp = timestamp;

        animationFrameId =
          window.requestAnimationFrame(move);

        return;
      }

      const elapsedSeconds =
        (timestamp - previousTimestamp) / 1000;

      previousTimestamp = timestamp;

      const cycleWidth = getCycleWidth();

      if (cycleWidth <= 0) {
        return;
      }

      currentPosition +=
        continuousSpeed * elapsedSeconds;

      if (loop) {
        if (currentPosition >= cycleWidth) {
          currentPosition %= cycleWidth;
        }
      } else {
        const maximumScrollLeft = Math.max(
          viewport.scrollWidth -
            viewport.clientWidth,
          0,
        );

        if (
          currentPosition >= maximumScrollLeft
        ) {
          viewport.scrollLeft =
            maximumScrollLeft;

          return;
        }
      }

      viewport.scrollLeft = currentPosition;

      animationFrameId =
        window.requestAnimationFrame(move);
    };

    const startTimeoutId =
      window.setTimeout(() => {
        const cycleWidth = getCycleWidth();

        if (cycleWidth <= 0) {
          return;
        }

        currentPosition =
          viewport.scrollLeft % cycleWidth;

        viewport.scrollLeft =
          currentPosition;

        previousTimestamp = null;

        hasStartedRef.current = true;

        animationFrameId =
          window.requestAnimationFrame(move);
      }, delay);

    return () => {
      window.clearTimeout(startTimeoutId);

      if (animationFrameId !== null) {
        window.cancelAnimationFrame(
          animationFrameId,
        );
      }
    };
  }, [
    autoplayDelay,
    continuousSpeed,
    enabled,
    hasOverflow,
    interactionVersion,
    isPaused,
    itemCount,
    loop,
    mode,
    resumeDelay,
    scrollNext,
    startDelay,
    trackRef,
    viewportRef,
  ]);

  return {
    isAutoMoving,
  };
}