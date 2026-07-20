"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import WrittenReviewCard from "./WrittenReviewCard";
import WrittenReviewModal from "./WrittenReviewModal";
import { useReviewModal } from "../shared/useReviewModal";
import type { PublicReview } from "../shared/types";
import styles from "./WrittenReviews.module.css";

interface WrittenReviewsCarouselProps {
  reviews: PublicReview[];
}

export default function WrittenReviewsCarousel({
  reviews,
}: WrittenReviewsCarouselProps) {
  const t = useTranslations("clientOpinions");
  const trackRef = useRef<HTMLDivElement | null>(null);
  const modal = useReviewModal({ itemCount: reviews.length });

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;

    const card = track.querySelector(`.${styles.cardCompact}`);
    const cardWidth = card instanceof HTMLElement ? card.offsetWidth : 320;

    track.scrollBy({ left: direction * (cardWidth + 14), behavior: "smooth" });
  };

  if (reviews.length === 0) {
    return null;
  }

  return (
    <div className={styles.carouselSection}>
      <div className={styles.carouselHeader}>
        <span className={styles.rowLabel}>{t("writtenReviews")}</span>

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
        aria-label={t("aria.writtenReviews")}
      >
        {reviews.map((review, index) => (
          <WrittenReviewCard
            key={review.id}
            review={review}
            variant="carousel"
            onOpen={(event) => modal.open(index, event.currentTarget)}
          />
        ))}
      </div>

      {modal.isOpen && (
        <WrittenReviewModal
          reviews={reviews}
          activeIndex={modal.activeIndex}
          onClose={modal.close}
          onNext={modal.next}
          onPrev={modal.prev}
        />
      )}
    </div>
  );
}
