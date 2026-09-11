"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type PointerEvent,
} from "react";

type UseCarouselInteractionOptions = {
  isExternallyPaused: boolean;
};

type InteractionModality =
  | "pointer"
  | "keyboard";

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

  const interactionModalityRef =
    useRef<InteractionModality>("pointer");

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

    /*
     * Pointer users should not keep the carousel
     * paused merely because a button still has
     * browser focus after being clicked.
     */
    if (
      interactionModalityRef.current ===
      "pointer"
    ) {
      setIsFocusInside(false);
    }

    markInteraction();
  }, [markInteraction]);

  const handlePointerDown = useCallback(
    (
      event: PointerEvent<HTMLDivElement>,
    ) => {
      interactionModalityRef.current =
        "pointer";

      setIsFocusInside(false);

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
    /*
     * Focus caused by keyboard navigation should
     * pause motion.
     *
     * Focus caused by clicking an item should not
     * become a permanent pause condition.
     */
    if (
      interactionModalityRef.current ===
      "keyboard"
    ) {
      setIsFocusInside(true);
    }
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
    interactionModalityRef.current =
      "pointer";

    setIsFocusInside(false);
    markInteraction();
  }, [markInteraction]);

  useEffect(() => {
    const handleDocumentPointerDown = () => {
      interactionModalityRef.current =
        "pointer";

      /*
       * This is particularly important when the
       * pointer is interacting with a popup that
       * lives outside the carousel element.
       */
      setIsFocusInside(false);
    };

    const handleDocumentKeyDown = () => {
      interactionModalityRef.current =
        "keyboard";
    };

    document.addEventListener(
      "pointerdown",
      handleDocumentPointerDown,
      true,
    );

    document.addEventListener(
      "keydown",
      handleDocumentKeyDown,
      true,
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        handleDocumentPointerDown,
        true,
      );

      document.removeEventListener(
        "keydown",
        handleDocumentKeyDown,
        true,
      );
    };
  }, []);

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