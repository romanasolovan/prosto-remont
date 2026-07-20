"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import type { VideoReview } from "./VideoReviewCard";
import styles from "./VideoReviews.module.css";

interface VideoReviewModalProps {
  reviews: VideoReview[];
  activeIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function VideoReviewModal({
  reviews,
  activeIndex,
  onClose,
  onNext,
  onPrev,
}: VideoReviewModalProps) {
  const t = useTranslations("clientOpinions");
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const activeReview = reviews[activeIndex];

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  if (!activeReview) {
    return null;
  }

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
        className={styles.videoModalDialog}
        role="dialog"
        aria-modal="true"
        aria-label={activeReview.name}
      >
        <button
          type="button"
          ref={closeButtonRef}
          className={styles.modalCloseButton}
          onClick={onClose}
          aria-label={t("aria.closeVideo")}
        >
          ×
        </button>

        {reviews.length > 1 && (
          <>
            <button
              type="button"
              className={`${styles.modalNavButton} ${styles.modalNavPrev}`}
              onClick={onPrev}
              aria-label={t("aria.previousVideo")}
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M15 6l-6 6 6 6"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              type="button"
              className={`${styles.modalNavButton} ${styles.modalNavNext}`}
              onClick={onNext}
              aria-label={t("aria.nextVideo")}
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M9 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </>
        )}

        <div className={styles.videoStage}>
          <video
            key={activeReview.id}
            className={styles.videoElement}
            controls
            playsInline
            preload="metadata"
            autoPlay
          >
            <source
              src={activeReview.video.url}
              type={activeReview.video.mimeType}
            />
          </video>
        </div>

        <div className={styles.videoModalMeta}>
          <span className={styles.videoModalName}>{activeReview.name}</span>
          <span className={styles.videoModalLocation}>
            {activeReview.location}
          </span>
        </div>
      </div>
    </div>
  );
}
