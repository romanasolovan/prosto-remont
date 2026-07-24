"use client";

import {
  forwardRef,
  useState,
  type MouseEvent,
} from "react";
import { useTranslations } from "next-intl";

import DataLoader from "@/components/ui/DataLoader/DataLoader";

import type {
  PublicReview,
  PublicReviewVideo,
} from "../shared/types";
import styles from "./VideoReviews.module.css";

export type VideoReview = PublicReview & {
  video: PublicReviewVideo;
};

interface VideoReviewCardProps {
  review: VideoReview;
  onOpen: (event: MouseEvent<HTMLButtonElement>) => void;
  variant?: "carousel" | "grid";
}

const VideoReviewCard = forwardRef<
  HTMLButtonElement,
  VideoReviewCardProps
>(function VideoReviewCard(
  {
    review,
    onOpen,
    variant = "carousel",
  },
  ref,
) {
  const t = useTranslations("clientOpinions");
  const [isMediaLoading, setIsMediaLoading] = useState(true);

  const uploadedVideo =
    review.video.source === "upload"
      ? review.video
      : undefined;

  const instagramVideo =
    review.video.source === "instagram"
      ? review.video
      : undefined;

  return (
    <button
      ref={ref}
      type="button"
      onClick={onOpen}
      className={`${styles.card} ${
        variant === "grid"
          ? styles.cardGrid
          : styles.cardCompact
      }`}
      aria-label={t("aria.playVideo")}
    >
      {isMediaLoading && (
        <span className={styles.cardLoader}>
          <DataLoader
            label={t("loadingVideo")}
            compact
          />
        </span>
      )}

      {uploadedVideo && (
        <video
          className={`${styles.cardPreview} ${
            isMediaLoading ? styles.mediaPending : ""
          }`}
          src={uploadedVideo.url}
          preload="metadata"
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          tabIndex={-1}
          aria-hidden="true"
          onCanPlay={() => setIsMediaLoading(false)}
          onLoadedData={() => setIsMediaLoading(false)}
          onError={() => setIsMediaLoading(false)}
        />
      )}

      {instagramVideo && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className={`${styles.cardPreview} ${
            isMediaLoading ? styles.mediaPending : ""
          }`}
          src={instagramVideo.posterUrl}
          alt=""
          draggable={false}
          aria-hidden="true"
          onLoad={() => setIsMediaLoading(false)}
          onError={() => setIsMediaLoading(false)}
        />
      )}

      <span className={styles.cardScrim} aria-hidden="true" />

      <span className={styles.playButton} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M8 5.5v13l11-6.5-11-6.5z"
            fill="currentColor"
          />
        </svg>
      </span>

      {instagramVideo && (
        <span
          className={styles.instagramCardBadge}
          aria-hidden="true"
        >
          Instagram
        </span>
      )}

      {variant === "grid" && (
        <span className={styles.cardMonogram} aria-hidden="true">
          {review.name.charAt(0).toUpperCase()}
        </span>
      )}

      <span className={styles.cardFooter}>
        <span className={styles.cardName}>
          {review.name}
        </span>

        <span className={styles.cardLocation}>
          {review.location}
        </span>

        {variant === "grid" && (
          <span
            className={styles.cardRating}
            aria-label={t("aria.rating", {
              rating: review.rating,
            })}
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <svg
                key={index}
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className={
                  index < review.rating
                    ? styles.starFilled
                    : styles.starEmpty
                }
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </span>
        )}
      </span>
    </button>
  );
});

export default VideoReviewCard;