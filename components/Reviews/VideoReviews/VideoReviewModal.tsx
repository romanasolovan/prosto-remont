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

const getInstagramEmbedUrl = (
  instagramUrl: string,
): string | undefined => {
  try {
    const url = new URL(instagramUrl);
    const hostname = url.hostname.toLowerCase();

    const isInstagramHost =
      hostname === "instagram.com" ||
      hostname.endsWith(".instagram.com");

    if (!isInstagramHost) {
      return undefined;
    }

    const match = url.pathname.match(
      /^\/(p|reel)\/([A-Za-z0-9_-]+)\/?$/,
    );

    if (!match) {
      return undefined;
    }

    const [, contentType, shortcode] = match;

    return `https://www.instagram.com/${contentType}/${shortcode}/embed/captioned/`;
  } catch {
    return undefined;
  }
};

interface ActiveReviewMediaProps {
  review: VideoReview;
}

/**
 * Remounts (via the parent's `key={activeReview.id}`) whenever the active
 * review changes, so it always initializes with a fresh isMediaLoading
 * state instead of needing an effect to reset it.
 */
function ActiveReviewMedia({ review }: ActiveReviewMediaProps) {
  const t = useTranslations("clientOpinions");
  const [isMediaLoading, setIsMediaLoading] = useState(true);

  const uploadedVideo =
    review.video.source === "upload" ? review.video : undefined;

  const instagramVideo =
    review.video.source === "instagram" ? review.video : undefined;

  const instagramEmbedUrl = instagramVideo
    ? getInstagramEmbedUrl(instagramVideo.url)
    : undefined;

  return (
    <>
      {isMediaLoading && (
        <div className={styles.modalLoader}>
          <DataLoader label={t("loadingVideo")} />
        </div>
      )}

      {uploadedVideo && (
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
          <source src={uploadedVideo.url} type={uploadedVideo.mimeType} />
        </video>
      )}

      {instagramVideo && instagramEmbedUrl && (
        <iframe
          className={`${styles.instagramEmbed} ${
            isMediaLoading ? styles.mediaPending : ""
          }`}
          src={instagramEmbedUrl}
          title={t("aria.instagramVideo", { name: review.name })}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
          loading="eager"
          onLoad={() => setIsMediaLoading(false)}
        />
      )}

      {instagramVideo && !instagramEmbedUrl && (
        <div className={styles.instagramEmbedError} role="status">
          <p>{t("instagramUnavailable")}</p>

          <a
            href={instagramVideo.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.instagramExternalLink}
          >
            {t("viewOnInstagram")}
          </a>
        </div>
      )}
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
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const activeReview = reviews[activeIndex];
  const isInstagramReview = activeReview?.video.source === "instagram";

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
      document.removeEventListener("keydown", handleKeyDown);
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
        className={`${styles.videoModalDialog} ${
          isInstagramReview
            ? styles.instagramModalDialog
            : styles.uploadModalDialog
        }`}
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

        <div
          className={`${styles.videoStage} ${
            isInstagramReview
              ? styles.instagramStage
              : styles.uploadStage
          }`}
        >
          <ActiveReviewMedia
            key={activeReview.id}
            review={activeReview}
          />
        </div>

        <div
          className={`${styles.videoModalMeta} ${
            isInstagramReview
              ? styles.instagramModalMeta
              : ""
          }`}
        >
          <div className={styles.videoModalIdentity}>
            <span className={styles.videoModalName}>
              {activeReview.name}
            </span>

            <span className={styles.videoModalLocation}>
              {activeReview.location}
            </span>
          </div>

          {isInstagramReview && activeReview.video.source === "instagram" && (
            <a
              href={activeReview.video.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.instagramSourceLink}
            >
              <span aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="5"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                  <circle
                    cx="17.4"
                    cy="6.7"
                    r="1"
                    fill="currentColor"
                  />
                </svg>
              </span>

              {t("viewOnInstagram")}
            </a>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}