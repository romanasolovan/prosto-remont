"use client";

import {
  Children,
  type ReactNode,
} from "react";

import { useCarousel } from "./useCarousel";
import {
  CarouselItemProvider,
} from "./CarouselItemContext";
import type { CarouselProps } from "./types";

import styles from "./Carousel.module.css";

function combineClassNames(
  ...classNames: Array<
    string | undefined | false
  >
) {
  return classNames.filter(Boolean).join(" ");
}

export default function Carousel({
  children,
  ariaLabel,
  previousLabel,
  nextLabel,

  className,
  viewportClassName,
  trackClassName,

  autoplay = false,
  autoplayDelay = 6000,

  motionMode = "step",
  continuousSpeed = 14,
  startDelay = 300,
  resumeDelay = 800,

  isPaused = false,

  step = 2,
  mobileStep = 1,
  loop = true,
}: CarouselProps) {
  const itemCount = Children.count(children);

  const shouldRenderContinuation =
    autoplay &&
    motionMode === "continuous" &&
    loop &&
    itemCount > 1;

  const continuationCount =
    shouldRenderContinuation && itemCount <= 3
      ? 2
      : shouldRenderContinuation
        ? 1
        : 0;

  const {
    viewportRef,
    railRef,
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
  } = useCarousel({
    itemCount,
    autoplay,
    autoplayDelay,
    motionMode,
    continuousSpeed,
    startDelay,
    resumeDelay,
    isExternallyPaused: isPaused,
    step,
    mobileStep,
    loop,
  });

  return (
    <div
      className={combineClassNames(
        styles.carousel,
        hasOverflow && styles.hasControls,
        isAutoMoving && styles.isAutoMoving,
        className,
      )}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onFocusCapture={handleFocusCapture}
      onBlurCapture={handleBlurCapture}
    >
      {hasOverflow ? (
        <button
          type="button"
          className={combineClassNames(
            styles.control,
            styles.controlPrevious,
          )}
          onClick={scrollPrevious}
          disabled={!canScrollPrevious}
          aria-label={previousLabel}
        >
          <span
            className={styles.controlIcon}
            aria-hidden="true"
          >
            ‹
          </span>
        </button>
      ) : null}

      <div
        ref={viewportRef}
        className={combineClassNames(
          styles.viewport,
          viewportClassName,
        )}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onWheel={handleWheel}
      >
        <div
          ref={railRef}
          className={styles.rail}
        >
          <ul
            ref={trackRef}
            className={combineClassNames(
              styles.track,
              trackClassName,
            )}
          >
            {children as ReactNode}
          </ul>

          {continuationCount > 0 ? (
            <CarouselItemProvider isContinuation>
              {Array.from({
                length: continuationCount,
              }).map((_, index) => (
                <ul
                  key={`carousel-continuation-${index}`}
                  className={combineClassNames(
                    styles.track,
                    trackClassName,
                  )}
                  data-carousel-continuation="true"
                  aria-hidden="true"
                >
                  {children as ReactNode}
                </ul>
              ))}
            </CarouselItemProvider>
          ) : null}
        </div>
      </div>

      {hasOverflow ? (
        <button
          type="button"
          className={combineClassNames(
            styles.control,
            styles.controlNext,
          )}
          onClick={scrollNext}
          disabled={!canScrollNext}
          aria-label={nextLabel}
        >
          <span
            className={styles.controlIcon}
            aria-hidden="true"
          >
            ›
          </span>
        </button>
      ) : null}
    </div>
  );
}