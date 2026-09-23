"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";

import DataLoader from "@/components/ui/DataLoader/DataLoader";

import type { VideoReview } from "./VideoReviewCard";

import styles from "./VideoReviews.module.css";

interface VideoReviewModalProps {
  reviews: VideoReview[];
  activeIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

interface ActiveReviewMediaProps {
  review: VideoReview;
}

function ActiveReviewMedia({
  review,
}: ActiveReviewMediaProps) {
  const t = useTranslations("clientOpinions");
  const [isMediaLoading, setIsMediaLoading] =
    useState(true);

  return (
    <>
      {isMediaLoading && (
        <div className={styles.modalLoader}>
          <DataLoader label={t("loadingVideo")} />
        </div>
      )}

      <video
        className={`${styles.videoElement} ${
          isMediaLoading ? styles.mediaPending : ""
        }`}
        controls
        playsInline
        preload="metadata"
        autoPlay
        onCanPlay={() => setIsMediaLoading(false)}
        onLoadedData={() => setIsMediaLoading(false)}
        onError={() => setIsMediaLoading(false)}
      >
        <source
          src={review.video.url}
          type={review.video.mimeType}
        />
      </video>
    </>
  );
}

export default function VideoReviewModal({
  reviews,
  activeIndex,
  onClose,
  onNext,
  onPrev,
}: VideoReviewModalProps) {
  const t = useTranslations("clientOpinions");
  const closeButtonRef =
    useRef<HTMLButtonElement | null>(null);

  const activeReview = reviews[activeIndex];

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (reviews.length <= 1) {
        return;
      }

      if (event.key === "ArrowRight") {
        onNext();
      }

      if (event.key === "ArrowLeft") {
        onPrev();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [
    onClose,
    onNext,
    onPrev,
    reviews.length,
  ]);

  if (!activeReview) {
    return null;
  }

  return createPortal(
    <div
      className={styles.modalOverlay}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className={`${styles.videoModalDialog} ${styles.uploadModalDialog}`}
        role="dialog"
        aria-modal="true"
        aria-label={activeReview.name}
      >
        <button
          ref={closeButtonRef}
          type="button"
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
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
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
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
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

        <div
          className={`${styles.videoStage} ${styles.uploadStage}`}
        >
          <ActiveReviewMedia
            key={activeReview.id}
            review={activeReview}
          />
        </div>

        <div className={styles.videoModalMeta}>
          <div className={styles.videoModalIdentity}>
            <span className={styles.videoModalName}>
              {activeReview.name}
            </span>

            <span className={styles.videoModalLocation}>
              {activeReview.location}
            </span>
          </div>

          {activeReview.videoNote && (
            <p className={styles.videoReviewNote}>
              {activeReview.videoNote}
            </p>
          )}

          {activeReview.videoSourceUrl && (
            <a
              href={activeReview.videoSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.videoSourceLink}
            >
              {t("viewVideoSource")}
            </a>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}