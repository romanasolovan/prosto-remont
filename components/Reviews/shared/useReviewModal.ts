"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface UseReviewModalOptions {
  itemCount: number;
}

export interface UseReviewModalResult {
  isOpen: boolean;
  activeIndex: number;
  open: (index: number, trigger?: HTMLElement | null) => void;
  close: () => void;
  next: () => void;
  prev: () => void;
}

export function useReviewModal({
  itemCount,
}: UseReviewModalOptions): UseReviewModalResult {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const triggerRef = useRef<HTMLElement | null>(null);

  const open = useCallback((index: number, trigger?: HTMLElement | null) => {
    triggerRef.current =
      trigger ?? (document.activeElement as HTMLElement | null);
    setActiveIndex(index);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  }, []);

  const next = useCallback(() => {
    if (itemCount === 0) return;
    setActiveIndex((current) => (current + 1) % itemCount);
  }, [itemCount]);

  const prev = useCallback(() => {
    if (itemCount === 0) return;
    setActiveIndex((current) => (current - 1 + itemCount) % itemCount);
  }, [itemCount]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      } else if (event.key === "ArrowRight") {
        next();
      } else if (event.key === "ArrowLeft") {
        prev();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, close, next, prev]);

  return { isOpen, activeIndex, open, close, next, prev };
}
