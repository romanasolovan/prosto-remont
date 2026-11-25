"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

import buttons from "@/components/ContactForm/Buttons/Buttons.module.css";
import styles from "./DiscardConfirmation.module.css";

interface DiscardConfirmationProps {
  onCancel: () => void;
  onDiscard: () => void;
}

export default function DiscardConfirmation({
  onCancel,
  onDiscard,
}: DiscardConfirmationProps) {
  const t = useTranslations("form.confirmation");

  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const discardButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    cancelButtonRef.current?.focus();
  }, []);

  return (
    <div className={styles.confirmationOverlay}>
      <div
        className={styles.confirmationDialog}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="discard-confirmation-title"
        aria-describedby="discard-confirmation-description"
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;

          event.preventDefault();

          if (document.activeElement === cancelButtonRef.current) {
            discardButtonRef.current?.focus();
          } else {
            cancelButtonRef.current?.focus();
          }
        }}
      >
        <p className={styles.eyebrow}>{t("eyebrow")}</p>

        <h3
          id="discard-confirmation-title"
          className={styles.title}
        >
          {t("title")}
        </h3>

        <p
          id="discard-confirmation-description"
          className={styles.description}
        >
          {t("description")}
        </p>

        <div className={styles.actions}>
          <button
            ref={discardButtonRef}
            type="button"
            onClick={onDiscard}
            className={buttons.secondaryButton}
          >
            {t("discard")}
          </button>

          <button
            ref={cancelButtonRef}
            type="button"
            onClick={onCancel}
            className={buttons.primaryButton}
          >
            {t("continueEditing")}
          </button>
        </div>
      </div>
    </div>
  );
}