"use client";

import { useTranslations } from "next-intl";
import styles from "./Buttons/Buttons.module.css";

interface SubmitButtonProps {
  isSubmitting: boolean;
}

export default function SubmitButton({ isSubmitting }: SubmitButtonProps) {
  const t = useTranslations("form");

  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className={styles.primaryButton}
      aria-busy={isSubmitting}
    >
      <span className={styles.submitButtonContent}>
        {isSubmitting && (
          <span className={styles.submitSpinner} aria-hidden="true" />
        )}
        <span>{isSubmitting ? t("submitting") : t("submit")}</span>
      </span>
    </button>
  );
}
