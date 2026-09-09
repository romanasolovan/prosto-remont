"use client";

import { useCallback } from "react";

import { useCarouselInteraction } from "./hooks/useCarouselInteraction";
import { useCarouselMotion } from "./hooks/useCarouselMotion";
import { useCarouselNavigation } from "./hooks/useCarouselNavigation";

import type { CarouselMotionMode } from "./hooks/useCarouselMotion";

type UseCarouselOptions = {
  itemCount: number;
  autoplay: boolean;
  autoplayDelay: number;
  motionMode: CarouselMotionMode;
  continuousSpeed: number;
  resumeDelay: number;
  isExternallyPaused: boolean;
  step: number;
  mobileStep: number;
  loop: boolean;
};

export function useCarousel({
  itemCount,
  autoplay,
  autoplayDelay,
  motionMode,
  continuousSpeed,
  resumeDelay,
  isExternallyPaused,
  step,
  mobileStep,
  loop,
}: UseCarouselOptions) {
  const {
    viewportRef,
    trackRef,

    hasOverflow,
    canScrollPrevious,
    canScrollNext,

    scroll,
  } = useCarouselNavigation({
    itemCount,
    step,
    mobileStep,
    loop,
  });

  const {
    interactionVersion,
    markInteraction,
    isInteractionPaused,

    handlePointerEnter,
    handlePointerLeave,
    handlePointerDown,
    handlePointerUp,
    handlePointerCancel,
    handleFocusCapture,
    handleBlurCapture,
    handleWheel,
  } = useCarouselInteraction({
    isExternallyPaused,
  });

  const scrollPrevious = useCallback(() => {
    markInteraction();
    scroll("previous");
  }, [markInteraction, scroll]);

  const scrollNext = useCallback(() => {
    markInteraction();
    scroll("next");
  }, [markInteraction, scroll]);

  const { isAutoMoving } = useCarouselMotion({
  viewportRef,
  enabled: autoplay,
  hasOverflow,
  itemCount,
  mode: motionMode,
  autoplayDelay,
  continuousSpeed,
  resumeDelay,
  isPaused: isInteractionPaused,
  interactionVersion,
  loop,
  scrollNext,
});

  return {
    viewportRef,
    trackRef,

    hasOverflow,
    canScrollPrevious,
    canScrollNext,
    isAutoMoving,

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