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
  Partner,
  PopupPosition,
} from "../types";


const POPUP_SIDE_GAP = 10;
const POPUP_ARROW_EDGE_GAP = 24;

type UsePartnerDetailsOptions = {
  shellRef: RefObject<HTMLDivElement | null>;
};

export function usePartnerDetails({
  shellRef,
}: UsePartnerDetailsOptions) {
  const [selectedPartner, setSelectedPartner] =
    useState<Partner | null>(null);

  const [isDetailsExpanded, setIsDetailsExpanded] =
    useState(false);

  const [popupPosition, setPopupPosition] =
    useState<PopupPosition | null>(null);

  const detailsRef = useRef<HTMLDivElement>(null);

  const activeTriggerRef =
    useRef<HTMLButtonElement | null>(null);

  const triggerRefs = useRef<
    Map<string, HTMLButtonElement>
  >(new Map());

  const setTriggerRef = useCallback(
    (
      partnerId: string,
      element: HTMLButtonElement | null,
    ) => {
      if (element) {
        triggerRefs.current.set(partnerId, element);
        return;
      }

      triggerRefs.current.delete(partnerId);
    },
    [],
  );

  const updatePopupPosition = useCallback(() => {
    const shell = shellRef.current;
    const details = detailsRef.current;
    const trigger = activeTriggerRef.current;

    if (!shell || !details || !trigger) {
      return;
    }

    const shellRect = shell.getBoundingClientRect();
    const detailsRect =
      details.getBoundingClientRect();
    const triggerRect =
      trigger.getBoundingClientRect();

    const triggerCenter =
      triggerRect.left +
      triggerRect.width / 2 -
      shellRect.left;

    const maximumLeft = Math.max(
      POPUP_SIDE_GAP,
      shellRect.width -
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
  }, [shellRef]);

  const closeDetails = useCallback(
    (restoreFocus = true) => {
      setSelectedPartner((currentPartner) => {
        if (restoreFocus && currentPartner) {
          window.requestAnimationFrame(() => {
            triggerRefs.current
              .get(currentPartner.id)
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

  const handlePartnerSelect = useCallback(
    (
      partner: Partner,
      trigger: HTMLButtonElement,
    ) => {
      if (selectedPartner?.id === partner.id) {
        closeDetails();
        return;
      }

      activeTriggerRef.current = trigger;

      setPopupPosition(null);
      setIsDetailsExpanded(false);
      setSelectedPartner(partner);
    },
    [closeDetails, selectedPartner],
  );

  const openExpandedDetails = useCallback(() => {
    setIsDetailsExpanded(true);
  }, []);

  const showCompactDetails = useCallback(() => {
    setIsDetailsExpanded(false);
  }, []);

  useLayoutEffect(() => {
    if (
      !selectedPartner ||
      isDetailsExpanded
    ) {
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
    selectedPartner,
    isDetailsExpanded,
    updatePopupPosition,
  ]);

  useEffect(() => {
    if (
      !selectedPartner ||
      isDetailsExpanded
    ) {
      return;
    }

    const handleResize = () => {
      updatePopupPosition();
    };

    window.addEventListener(
      "resize",
      handleResize,
    );

    const shell = shellRef.current;
    const details = detailsRef.current;

    if (!shell || !details) {
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

    resizeObserver.observe(shell);
    resizeObserver.observe(details);

    return () => {
      window.removeEventListener(
        "resize",
        handleResize,
      );

      resizeObserver.disconnect();
    };
  }, [
    selectedPartner,
    isDetailsExpanded,
    shellRef,
    updatePopupPosition,
  ]);

  useEffect(() => {
    if (
      !selectedPartner ||
      isDetailsExpanded
    ) {
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

      const clickedDetails =
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
        !clickedDetails &&
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
    selectedPartner,
    isDetailsExpanded,
  ]);

  return {
    selectedPartner,
    isDetailsExpanded,
    popupPosition,
    detailsRef,
    setTriggerRef,
    handlePartnerSelect,
    closeDetails,
    openExpandedDetails,
    showCompactDetails,
  };
}