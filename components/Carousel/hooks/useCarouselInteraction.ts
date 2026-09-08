"use client";
import {
  useCallback,
  useEffect,
  useState,
  type FocusEvent,
  type PointerEvent,
} from "react";
type UseCarouselInteractionOptions = {
  isExternallyPaused: boolean;
};

export function useCarouselInteraction({
  isExternallyPaused,
}: UseCarouselInteractionOptions) {
  const [isPointerInside, setIsPointerInside] =
    useState(false);

  const [isFocusInside, setIsFocusInside] =
    useState(false);

  const [isTouching, setIsTouching] =
    useState(false);

  const [isDocumentHidden, setIsDocumentHidden] =
    useState(false);

  const [
    prefersReducedMotion,
    setPrefersReducedMotion,
  ] = useState(false);

  const [interactionVersion, setInteractionVersion] =
    useState(0);

  const markInteraction = useCallback(() => {
    setInteractionVersion(
      (currentVersion) => currentVersion + 1,
    );
  }, []);

  const handlePointerEnter = useCallback(() => {
    setIsPointerInside(true);
  }, []);

  const handlePointerLeave = useCallback(() => {
    setIsPointerInside(false);
    setIsTouching(false);
    markInteraction();
  }, [markInteraction]);

  const handlePointerDown = useCallback(
    (
      event: PointerEvent<HTMLDivElement>,
    ) => {
      if (event.pointerType === "touch") {
        setIsTouching(true);
      }

      markInteraction();
    },
    [markInteraction],
  );

  const handlePointerUp = useCallback(() => {
    setIsTouching(false);
    markInteraction();
  }, [markInteraction]);

  const handlePointerCancel = useCallback(() => {
    setIsTouching(false);
    markInteraction();
  }, [markInteraction]);

  const handleFocusCapture = useCallback(() => {
    setIsFocusInside(true);
  }, []);

  const handleBlurCapture = useCallback(
    (event: FocusEvent<HTMLDivElement>) => {
      const nextFocusedElement =
        event.relatedTarget;

      if (
        !(nextFocusedElement instanceof Node) ||
        !event.currentTarget.contains(
          nextFocusedElement,
        )
      ) {
        setIsFocusInside(false);
        markInteraction();
      }
    },
    [markInteraction],
  );

  const handleWheel = useCallback(() => {
    markInteraction();
  }, [markInteraction]);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const updatePreference = () => {
      setPrefersReducedMotion(
        mediaQuery.matches,
      );
    };

    updatePreference();

    mediaQuery.addEventListener(
      "change",
      updatePreference,
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        updatePreference,
      );
    };
  }, []);

  useEffect(() => {
    const updateVisibility = () => {
      setIsDocumentHidden(document.hidden);
    };

    updateVisibility();

    document.addEventListener(
      "visibilitychange",
      updateVisibility,
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        updateVisibility,
      );
    };
  }, []);

  const isInteractionPaused =
    isExternallyPaused ||
    isPointerInside ||
    isFocusInside ||
    isTouching ||
    isDocumentHidden ||
    prefersReducedMotion;

  return {
    interactionVersion,
    markInteraction,

    isPointerInside,
    isFocusInside,
    isTouching,
    isDocumentHidden,
    prefersReducedMotion,
    isInteractionPaused,

    handlePointerEnter,
    handlePointerLeave,
    handlePointerDown,
    handlePointerUp,
    handlePointerCancel,
    handleFocusCapture,
    handleBlurCapture,
    handleWheel,
  };
}