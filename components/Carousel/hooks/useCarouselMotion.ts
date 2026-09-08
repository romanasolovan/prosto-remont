"use client";

import {
  useEffect,
  type RefObject,
} from "react";

export type CarouselMotionMode =
  | "step"
  | "continuous";

type UseCarouselMotionOptions = {
  viewportRef: RefObject<HTMLDivElement | null>;

  enabled: boolean;
  hasOverflow: boolean;
  itemCount: number;

  mode: CarouselMotionMode;

  autoplayDelay: number;
  continuousSpeed: number;
  resumeDelay: number;

  isPaused: boolean;
  interactionVersion: number;

  loop: boolean;

  scrollNext: () => void;
};

export function useCarouselMotion({
  viewportRef,
  enabled,
  hasOverflow,
  itemCount,
  mode,
  autoplayDelay,
  continuousSpeed,
  resumeDelay,
  isPaused,
  interactionVersion,
  loop,
  scrollNext,
}: UseCarouselMotionOptions) {
  useEffect(() => {
    const viewport = viewportRef.current;

    const canMove =
      enabled &&
      hasOverflow &&
      itemCount > 1 &&
      !isPaused;

    if (!viewport || !canMove) {
      return;
    }

    if (mode === "step") {
      let timeoutId: number | null = null;

      const scheduleNext = () => {
        timeoutId = window.setTimeout(() => {
          scrollNext();
          scheduleNext();
        }, autoplayDelay);
      };

      const resumeTimeoutId =
        window.setTimeout(() => {
          scheduleNext();
        }, resumeDelay);

      return () => {
        window.clearTimeout(resumeTimeoutId);

        if (timeoutId !== null) {
          window.clearTimeout(timeoutId);
        }
      };
    }

    let animationFrameId = 0;
    let previousTimestamp: number | null = null;

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

      const maximumScrollLeft =
        Math.max(
          viewport.scrollWidth -
            viewport.clientWidth,
          0,
        );

      if (maximumScrollLeft <= 0) {
        return;
      }

      const nextScrollLeft =
        viewport.scrollLeft +
        continuousSpeed * elapsedSeconds;

      if (
        nextScrollLeft >=
        maximumScrollLeft
      ) {
        if (loop) {
          viewport.scrollLeft = 0;
          previousTimestamp = timestamp;
        } else {
          viewport.scrollLeft =
            maximumScrollLeft;

          return;
        }
      } else {
        viewport.scrollLeft =
          nextScrollLeft;
      }

      animationFrameId =
        window.requestAnimationFrame(move);
    };

    const resumeTimeoutId =
      window.setTimeout(() => {
        animationFrameId =
          window.requestAnimationFrame(move);
      }, resumeDelay);

    return () => {
      window.clearTimeout(resumeTimeoutId);
      window.cancelAnimationFrame(
        animationFrameId,
      );
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
    viewportRef,
  ]);
}