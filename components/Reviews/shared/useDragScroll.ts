"use client";

import { useCallback, useRef } from "react";

const DRAG_THRESHOLD = 6;

export function useDragScroll() {
  const isPointerDown = useRef(false);
  const didDrag = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);

  const onPointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.pointerType === "touch") return; // native touch scroll handles this
      const track = event.currentTarget;
      isPointerDown.current = true;
      didDrag.current = false;
      startX.current = event.clientX;
      startScrollLeft.current = track.scrollLeft;
      track.setPointerCapture(event.pointerId);
    },
    [],
  );

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!isPointerDown.current) return;
      const track = event.currentTarget;
      const delta = event.clientX - startX.current;

      if (Math.abs(delta) > DRAG_THRESHOLD) {
        didDrag.current = true;
      }

      track.scrollLeft = startScrollLeft.current - delta;
    },
    [],
  );

  const endDrag = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    isPointerDown.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }, []);

  const wasDragged = useCallback(() => didDrag.current, []);

  return {
    trackProps: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerLeave: endDrag,
    },
    wasDragged,
  };
}