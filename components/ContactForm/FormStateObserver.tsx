"use client";

import { useEffect } from "react";
import { useFormikContext } from "formik";

import type {
  FormValues,
  FormStateObserverProps,
} from "./types";

export default function FormStateObserver({
  onStateChange,
}: FormStateObserverProps) {
  const { dirty, isSubmitting } =
    useFormikContext<FormValues>();

  useEffect(() => {
    onStateChange?.({
      dirty,
      isSubmitting,
    });
  }, [dirty, isSubmitting, onStateChange]);

  return null;
}