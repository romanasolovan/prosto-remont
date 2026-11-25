"use client";

import { useEffect, useRef } from "react";
import { useFormikContext } from "formik";

import type { FormValues } from "./types";

export default function FormErrorFocus() {
  const { submitCount, isSubmitting, isValidating, errors } =
    useFormikContext<FormValues>();

  const anchorRef = useRef<HTMLSpanElement>(null);
  const lastHandledSubmit = useRef(0);

  useEffect(() => {
    if (submitCount === 0) {
      lastHandledSubmit.current = 0;
      return;
    }

    if (
      isSubmitting ||
      isValidating ||
      submitCount <= lastHandledSubmit.current
    ) {
      return;
    }

    lastHandledSubmit.current = submitCount;

    if (Object.keys(errors).length === 0) return;

    const form = anchorRef.current?.closest("form");

    const firstInvalidField = form?.querySelector<HTMLElement>(
  '[aria-invalid="true"], [data-invalid="true"]',
);

    if (!firstInvalidField) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    firstInvalidField.focus({ preventScroll: true });

    firstInvalidField.scrollIntoView({
      behavior: prefersReducedMotion ? "instant" : "smooth",
      block: "center",
    });
  }, [submitCount, isSubmitting, isValidating, errors]);

  return <span ref={anchorRef} hidden aria-hidden="true" />;
}