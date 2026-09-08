import type { ReactNode } from "react";
import type { CarouselMotionMode } from "./hooks/useCarouselMotion";

export type CarouselDirection =
  | "previous"
  | "next";

export type CarouselProps = {
  children: ReactNode;

  ariaLabel: string;
  previousLabel: string;
  nextLabel: string;

  className?: string;
  viewportClassName?: string;
  trackClassName?: string;

  autoplay?: boolean;
  autoplayDelay?: number;

  motionMode?: CarouselMotionMode;
  continuousSpeed?: number;
  resumeDelay?: number;

  isPaused?: boolean;

  step?: number;
  mobileStep?: number;

  loop?: boolean;
};