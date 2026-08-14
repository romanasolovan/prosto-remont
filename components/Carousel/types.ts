import type { ReactNode } from "react";

export type CarouselDirection = "previous" | "next";

export type CarouselProps = {
  children: ReactNode;
  ariaLabel: string;
  previousLabel: string;
  nextLabel: string;
  className?: string;
  viewportClassName?: string;
  trackClassName?: string;
};