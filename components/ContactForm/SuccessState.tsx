"use client";

import { useTranslations } from "next-intl";
import buttons from "./Buttons/Buttons.module.css";
import styles from "./States/SuccessState.module.css";

interface SuccessStateProps {
  onSendAnother: () => void;
  onClose?: () => void;
}

export default function SuccessState({
  onSendAnother,
  onClose,
}: SuccessStateProps) {
  const t = useTranslations("form");

  return (
    <div className={styles.successState} role="status" aria-live="polite">
      <div className={styles.successMark} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M20 7L9.5 17.5L4 12"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <p className={styles.successTextSimple}>{t("successMessage")}</p>

      <div className={styles.successActions}>
        <button
          type="button"
          onClick={onSendAnother}
          className={buttons.secondaryButton}
        >
          {t("actions.sendAnother")}
        </button>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className={buttons.primaryButton}
          >
            {t("actions.close")}
          </button>
        )}
      </div>
    </div>
  );
}
