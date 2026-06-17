"use client";

import { useTranslations } from "next-intl";
import styles from "./ContactForm.module.css";

export default function SubmitError() {
  const t = useTranslations("form");

  return (
    <div className={styles.submitError} role="alert" aria-live="polite">
      <div className={styles.submitErrorIcon} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M12 8V13"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle cx="12" cy="17" r="1" fill="currentColor" />
          <path
            d="M10.2 3.8L2.8 17.2C2.1 18.5 3.1 20 4.6 20H19.4C20.9 20 21.9 18.5 21.2 17.2L13.8 3.8C13 2.4 11 2.4 10.2 3.8Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <p className={styles.submitErrorText}>{t("errorMessage")}</p>
    </div>
  );
}
