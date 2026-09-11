"use client";
import {
  createContext,
  useContext,
  type ReactNode,
} from "react";

type CarouselItemContextValue = {
  isContinuation: boolean;
};

const CarouselItemContext =
  createContext<CarouselItemContextValue>({
    isContinuation: false,
  });

type CarouselItemProviderProps = {
  children: ReactNode;
  isContinuation: boolean;
};

export function CarouselItemProvider({
  children,
  isContinuation,
}: CarouselItemProviderProps) {
  return (
    <CarouselItemContext.Provider
      value={{ isContinuation }}
    >
      {children}
    </CarouselItemContext.Provider>
  );
}

export function useCarouselItemContext() {
  return useContext(CarouselItemContext);
}