"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { useTranslations } from "next-intl";

import ContactForm from "@/components/ContactForm/ContactForm";
import type { ContactFormState } from "@/components/ContactForm/types";

import DiscardConfirmation from "./DiscardConfirmation";
import { useModalFocus } from "./useModalFocus";
import styles from "./QuoteRequestModal.module.css";

interface QuoteRequestModalProps {
  onClose: () => void;
}

export default function QuoteRequestModal({
  onClose,
}: QuoteRequestModalProps) {
  const t = useTranslations("form");

  const dialogRef = useRef<HTMLDivElement>(null);

useModalFocus(dialogRef);

  const [formState, setFormState] = useState<ContactFormState>({
    dirty: false,
    isSubmitting: false,
  });

  const [showConfirmation, setShowConfirmation] =
    useState(false);

  const previousFocusRef = useRef<HTMLElement | null>(null);

  const handleFormStateChange = useCallback(
    (state: ContactFormState) => {
      setFormState(state);
    },
    [],
  );

  const requestClose = useCallback(() => {
    if (formState.isSubmitting || showConfirmation) return;

    if (formState.dirty) {
      previousFocusRef.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;

      setShowConfirmation(true);
      return;
    }

    onClose();
  }, [
    formState.dirty,
    formState.isSubmitting,
    showConfirmation,
    onClose,
  ]);

  const cancelClose = useCallback(() => {
    setShowConfirmation(false);
  }, []);

  useEffect(() => {
    if (!showConfirmation && previousFocusRef.current) {
      previousFocusRef.current.focus();
      previousFocusRef.current = null;
    }
  }, [showConfirmation]);

  // Lock background scrolling while the modal is open.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  // Handle Escape without interrupting dropdowns or calendars.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || event.defaultPrevented) {
        return;
      }

      if (showConfirmation) {
        event.preventDefault();
        cancelClose();
        return;
      }

      requestClose();
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [showConfirmation, cancelClose, requestClose]);

  // Protect unsaved information during a browser refresh.
  useEffect(() => {
    if (!formState.dirty && !formState.isSubmitting) return;

    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", onBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, [formState.dirty, formState.isSubmitting]);

  return (
    <div
      className={styles.modalOverlay}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          requestClose();
        }
      }}
    >
      <div
  ref={dialogRef}
  className={styles.modalDialog}
  role="dialog"
  aria-modal="true"
  aria-labelledby="quote-modal-title"
  aria-describedby="quote-modal-description"
  tabIndex={-1}
>
        <div className={styles.modalGlow} aria-hidden="true" />

        <div
          className={styles.modalContent}
          inert={showConfirmation}
        >
          <div
            className={styles.mobileHandle}
            aria-hidden="true"
          />

          <button
            type="button"
            onClick={requestClose}
            disabled={formState.isSubmitting}
            className={styles.closeButton}
            aria-label={t("modal.closeAriaLabel")}
          >
            <span className={styles.closeButtonLine} />
            <span className={styles.closeButtonLine} />
          </button>

          <div className={styles.modalTopBar}>
            <div className={styles.modalHeaderCopy}>
              <p className={styles.eyebrow}>
                {t("modal.eyebrow")}
              </p>

              <h2
                id="quote-modal-title"
                className={styles.modalTitle}
              >
                {t("title")}
              </h2>

              <p
                id="quote-modal-description"
                className={styles.modalDescription}
              >
                {t("subtitle")}
              </p>
            </div>
          </div>

          <div className={styles.modalBody}>
            <ContactForm
              onClose={requestClose}
              onFormStateChange={handleFormStateChange}
            />
          </div>
        </div>

        {showConfirmation && (
          <DiscardConfirmation
            onCancel={cancelClose}
            onDiscard={onClose}
          />
        )}
      </div>
    </div>
  );
}