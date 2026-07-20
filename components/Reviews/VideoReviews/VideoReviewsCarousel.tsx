"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import VideoReviewCard, { type VideoReview } from "./VideoReviewCard";
import VideoReviewModal from "./VideoReviewModal";
import { useReviewModal } from "../shared/useReviewModal";
import type { PublicReview } from "../shared/types";
import styles from "./VideoReviews.module.css";

interface VideoReviewsCarouselProps {
  reviews: PublicReview[];
}

export default function VideoReviewsCarousel({
  reviews,
}: VideoReviewsCarouselProps) {
  const t = useTranslations("clientOpinions");
  const trackRef = useRef<HTMLDivElement | null>(null);

  const videoReviews = reviews.filter((review): review is VideoReview =>
    Boolean(review.video),
  );

  const modal = useReviewModal({ itemCount: videoReviews.length });

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;

    const card = track.querySelector(`.${styles.cardCompact}`);
    const cardWidth = card instanceof HTMLElement ? card.offsetWidth : 220;

    track.scrollBy({ left: direction * (cardWidth + 14), behavior: "smooth" });
  };

  if (videoReviews.length === 0) {
    return null;
  }

  return (
    <div className={styles.carouselSection}>
      <div className={styles.carouselHeader}>
        <span className={styles.rowLabel}>{t("videoReviews")}</span>

        <div className={styles.carouselControls}>
          <button
            type="button"
            className={styles.carouselArrow}
            onClick={() => scrollByCard(-1)}
            aria-label={t("aria.scrollPrevious")}
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
            className={styles.carouselArrow}
            onClick={() => scrollByCard(1)}
            aria-label={t("aria.scrollNext")}
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
        </div>
      </div>

      <div
        ref={trackRef}
        className={styles.track}
        aria-label={t("aria.videoReviews")}
      >
        {videoReviews.map((review, index) => (
          <VideoReviewCard
            key={review.id}
            review={review}
            variant="carousel"
            onOpen={(event) => modal.open(index, event.currentTarget)}
          />
        ))}
      </div>

      {modal.isOpen && (
        <VideoReviewModal
          reviews={videoReviews}
          activeIndex={modal.activeIndex}
          onClose={modal.close}
          onNext={modal.next}
          onPrev={modal.prev}
        />
      )}
    </div>
  );
}
