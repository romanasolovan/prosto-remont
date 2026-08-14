"use client";

import {
  Children,
  type ReactNode,
} from "react";

import { useCarousel } from "./useCarousel";

import type { CarouselProps } from "./types";

import styles from "./Carousel.module.css";

function combineClassNames(
  ...classNames: Array<string | undefined>
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
}: CarouselProps) {
  const itemCount = Children.count(children);

  const {
    viewportRef,
    trackRef,
    hasOverflow,
    canScrollPrevious,
    canScrollNext,
    scrollPrevious,
    scrollNext,
  } = useCarousel({
    itemCount,
  });

  return (
    <div
      className={combineClassNames(
        styles.carousel,
        className,
      )}
    >
      {hasOverflow ? (
        <>
          <button
            type="button"
            className={`${styles.control} ${styles.previousControl}`}
            onClick={scrollPrevious}
            disabled={!canScrollPrevious}
            aria-label={previousLabel}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M15 6L9 12L15 18"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            type="button"
            className={`${styles.control} ${styles.nextControl}`}
            onClick={scrollNext}
            disabled={!canScrollNext}
            aria-label={nextLabel}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M9 6L15 12L9 18"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </>
      ) : null}

      <div
        ref={viewportRef}
        className={combineClassNames(
          styles.viewport,
          viewportClassName,
        )}
        role="region"
        aria-label={ariaLabel}
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
      </div>
    </div>
  );
}