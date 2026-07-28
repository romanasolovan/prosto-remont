"use client";

import {
  useCallback,
  useRef,
  type PointerEvent as ReactPointerEvent,
} from "react";

const DRAG_THRESHOLD = 6;

interface DragPosition {
  pointerId: number;
  startX: number;
  startScrollLeft: number;
}

export function useDragScroll() {
  const dragPositionRef = useRef<DragPosition | null>(null);
  const didDragRef = useRef(false);
  const hasPointerCaptureRef = useRef(false);

  const onPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      /*
       * Touch devices should keep native horizontal scrolling.
       */
      if (event.pointerType === "touch") {
        return;
      }

      dragPositionRef.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startScrollLeft: event.currentTarget.scrollLeft,
      };

      didDragRef.current = false;
      hasPointerCaptureRef.current = false;
    },
    [],
  );

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const dragPosition = dragPositionRef.current;

      if (
        !dragPosition ||
        dragPosition.pointerId !== event.pointerId
      ) {
        return;
      }

      const deltaX =
        event.clientX - dragPosition.startX;

      /*
       * Do not capture the pointer during a normal click.
       * Pointer capture begins only after actual dragging starts.
       */
      if (
        !didDragRef.current &&
        Math.abs(deltaX) <= DRAG_THRESHOLD
      ) {
        return;
      }

      if (!didDragRef.current) {
        didDragRef.current = true;

        event.currentTarget.setPointerCapture(
          event.pointerId,
        );

        hasPointerCaptureRef.current = true;
      }

      event.preventDefault();

      event.currentTarget.scrollLeft =
        dragPosition.startScrollLeft - deltaX;
    },
    [],
  );

  const endDrag = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const dragPosition = dragPositionRef.current;

      if (
        !dragPosition ||
        dragPosition.pointerId !== event.pointerId
      ) {
        return;
      }

      if (
        hasPointerCaptureRef.current &&
        event.currentTarget.hasPointerCapture(
          event.pointerId,
        )
      ) {
        event.currentTarget.releasePointerCapture(
          event.pointerId,
        );
      }

      dragPositionRef.current = null;
      hasPointerCaptureRef.current = false;
    },
    [],
  );

  const wasDragged = useCallback(
    (): boolean => didDragRef.current,
    [],
  );

  return {
    trackProps: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
    },
    wasDragged,
  };
}