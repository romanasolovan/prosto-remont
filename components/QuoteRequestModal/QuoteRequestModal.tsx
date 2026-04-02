"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import ContactForm from "@/components/ContactForm/ContactForm";
import styles from "./QuoteRequestModal.module.css";

interface QuoteRequestModalProps {
  onClose: () => void;
}

export default function QuoteRequestModal({ onClose }: QuoteRequestModalProps) {
  const t = useTranslations("form");

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className={styles.modalOverlay}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className={styles.modalDialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-modal-title"
        aria-describedby="quote-modal-description"
      >
        <div className={styles.modalTopBar}>
          <div className={styles.modalHeaderCopy}>
            <p className={styles.eyebrow}>pro100remont</p>
            <h2 id="quote-modal-title" className={styles.modalTitle}>
              {t("title")}
            </h2>
            <p id="quote-modal-description" className={styles.modalDescription}>
              {t("subtitle")}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Close quote request form"
          >
            <span className={styles.closeButtonLine} />
            <span className={styles.closeButtonLine} />
          </button>
        </div>

        <div className={styles.modalBody}>
          <ContactForm onClose={onClose} />
        </div>
      </div>
    </div>
  );
}
