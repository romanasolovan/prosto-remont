"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
} from "react";

import type {
  Brand,
  PopupPosition,
} from "../types";

const POPUP_SIDE_GAP = 12;
const POPUP_ARROW_EDGE_GAP = 26;

type UseBrandDetailsOptions = {
  contentRef: RefObject<HTMLDivElement | null>;
};

export function useBrandDetails({
  contentRef,
}: UseBrandDetailsOptions) {
  const [selectedBrand, setSelectedBrand] =
    useState<Brand | null>(null);

  const [popupPosition, setPopupPosition] =
      useState<PopupPosition | null>(null);
    
  const [isDetailsExpanded, setIsDetailsExpanded] =
  useState(false);

  const detailsRef = useRef<HTMLDivElement>(null);

  const activeTriggerRef =
    useRef<HTMLButtonElement | null>(null);

  const triggerRefs = useRef<
    Map<string, HTMLButtonElement>
  >(new Map());

  const setTriggerRef = useCallback(
    (
      brandId: string,
      element: HTMLButtonElement | null,
    ) => {
      if (element) {
        triggerRefs.current.set(brandId, element);
        return;
      }

      triggerRefs.current.delete(brandId);
    },
    [],
  );

  const updatePopupPosition = useCallback(() => {
    const content = contentRef.current;
    const details = detailsRef.current;
    const trigger = activeTriggerRef.current;

    if (!content || !details || !trigger) {
      return;
    }

    const contentRect =
      content.getBoundingClientRect();

    const detailsRect =
      details.getBoundingClientRect();

    const triggerRect =
      trigger.getBoundingClientRect();

    const triggerCenter =
      triggerRect.left +
      triggerRect.width / 2 -
      contentRect.left;

    const maximumLeft = Math.max(
      POPUP_SIDE_GAP,
      contentRect.width -
        detailsRect.width -
        POPUP_SIDE_GAP,
    );

    const preferredLeft =
      triggerCenter - detailsRect.width / 2;

    const left = Math.min(
      Math.max(
        preferredLeft,
        POPUP_SIDE_GAP,
      ),
      maximumLeft,
    );

    const arrowLeft = Math.min(
      Math.max(
        triggerCenter - left,
        POPUP_ARROW_EDGE_GAP,
      ),
      detailsRect.width -
        POPUP_ARROW_EDGE_GAP,
    );

    setPopupPosition({
      left,
      arrowLeft,
    });
  }, [contentRef]);

  const closeDetails = useCallback(
  (restoreFocus = true) => {
    setSelectedBrand((currentBrand) => {
      if (restoreFocus && currentBrand) {
        window.requestAnimationFrame(() => {
          triggerRefs.current
            .get(currentBrand.id)
            ?.focus();
        });
      }

      return null;
    });

    activeTriggerRef.current = null;

    setPopupPosition(null);
    setIsDetailsExpanded(false);
  },
  [],
);

  const handleBrandSelect = useCallback(
  (
    brand: Brand,
    trigger: HTMLButtonElement,
  ) => {
    if (selectedBrand?.id === brand.id) {
      closeDetails();
      return;
    }

    activeTriggerRef.current = trigger;

    setPopupPosition(null);
    setIsDetailsExpanded(false);
    setSelectedBrand(brand);
  },
  [closeDetails, selectedBrand],
  );
    
    const openExpandedDetails = useCallback(() => {
  setIsDetailsExpanded(true);
}, []);

const showCompactDetails = useCallback(() => {
  setIsDetailsExpanded(false);
}, []);

  useLayoutEffect(() => {
    if (!selectedBrand || isDetailsExpanded) {
      return;
    }

    const animationFrameId =
      window.requestAnimationFrame(() => {
        updatePopupPosition();
      });

    return () => {
      window.cancelAnimationFrame(
        animationFrameId,
      );
    };
  }, [
      selectedBrand,
      isDetailsExpanded,
      updatePopupPosition,
  ]);

  useEffect(() => {
    if (!selectedBrand || isDetailsExpanded) {
      return;
    }

    const handleResize = () => {
      updatePopupPosition();
    };

    window.addEventListener(
      "resize",
      handleResize,
    );

    const content = contentRef.current;
    const details = detailsRef.current;

    if (!content || !details) {
      return () => {
        window.removeEventListener(
          "resize",
          handleResize,
        );
      };
    }

    const resizeObserver =
      new ResizeObserver(() => {
        updatePopupPosition();
      });

    resizeObserver.observe(content);
    resizeObserver.observe(details);

    return () => {
      window.removeEventListener(
        "resize",
        handleResize,
      );

      resizeObserver.disconnect();
    };
  }, [
    selectedBrand,
    isDetailsExpanded,
    contentRef,
    updatePopupPosition,
  ]);

  useEffect(() => {
    if (!selectedBrand || isDetailsExpanded) {
      return;
    }

    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        closeDetails();
      }
    };

    const handlePointerDown = (
      event: PointerEvent,
    ) => {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      const clickedInsideDetails =
        detailsRef.current?.contains(target) ??
        false;

      const clickedPrimaryTrigger =
        Array.from(
          triggerRefs.current.values(),
        ).some((trigger) =>
          trigger.contains(target),
        );

      const clickedActiveTrigger =
        activeTriggerRef.current?.contains(
          target,
        ) ?? false;

      if (
        !clickedInsideDetails &&
        !clickedPrimaryTrigger &&
        !clickedActiveTrigger
      ) {
        closeDetails(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown,
    );

    document.addEventListener(
      "pointerdown",
      handlePointerDown,
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown,
      );

      document.removeEventListener(
        "pointerdown",
        handlePointerDown,
      );
    };
  }, [
    closeDetails,
      selectedBrand,
    isDetailsExpanded,
  ]);

  return {
  selectedBrand,
  isDetailsExpanded,
  popupPosition,
  detailsRef,
  setTriggerRef,
  handleBrandSelect,
  closeDetails,
  openExpandedDetails,
  showCompactDetails,
};
}