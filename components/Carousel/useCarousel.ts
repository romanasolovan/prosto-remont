"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import type { CarouselDirection } from "./types";

type UseCarouselOptions = {
  itemCount: number;
};

const EDGE_TOLERANCE = 2;

export function useCarousel({
  itemCount,
}: UseCarouselOptions) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);

  const [hasOverflow, setHasOverflow] =
    useState(false);

  const [canScrollPrevious, setCanScrollPrevious] =
    useState(false);

  const [canScrollNext, setCanScrollNext] =
    useState(false);

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

  const scroll = useCallback(
    (direction: CarouselDirection) => {
      const viewport = viewportRef.current;
      const track = trackRef.current;

      if (!viewport || !track) {
        return;
      }

      const items = Array.from(
        track.children,
      ).filter(
        (element): element is HTMLElement =>
          element instanceof HTMLElement,
      );

      if (!items.length) {
        return;
      }

      const firstItem = items[0];

      if (!firstItem) {
        return;
      }

      const targets = items.map(
        (item) =>
          item.offsetLeft - firstItem.offsetLeft,
      );

      const currentScrollLeft = viewport.scrollLeft;

      let nearestIndex = 0;
      let nearestDistance =
        Number.POSITIVE_INFINITY;

      targets.forEach((target, index) => {
        const distance = Math.abs(
          target - currentScrollLeft,
        );

        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = index;
        }
      });

      const targetIndex =
        direction === "next"
          ? Math.min(
              nearestIndex + 1,
              items.length - 1,
            )
          : Math.max(nearestIndex - 1, 0);

      const targetLeft = targets[targetIndex];

      if (targetLeft === undefined) {
        return;
      }

      viewport.scrollTo({
        left: targetLeft,
        behavior: "smooth",
      });
    },
    [],
  );

  const scrollPrevious = useCallback(() => {
    scroll("previous");
  }, [scroll]);

  const scrollNext = useCallback(() => {
    scroll("next");
  }, [scroll]);

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

  return {
    viewportRef,
    trackRef,
    hasOverflow,
    canScrollPrevious,
    canScrollNext,
    scrollPrevious,
    scrollNext,
  };
}