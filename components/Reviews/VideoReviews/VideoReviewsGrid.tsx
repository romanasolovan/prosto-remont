"use client";

import { useTranslations } from "next-intl";
import VideoReviewCard, { type VideoReview } from "./VideoReviewCard";
import VideoReviewModal from "./VideoReviewModal";
import { useReviewModal } from "../shared/useReviewModal";
import type { PublicReview } from "../shared/types";
import styles from "./VideoReviews.module.css";

interface VideoReviewsGridProps {
  reviews: PublicReview[];
}

export default function VideoReviewsGrid({ reviews }: VideoReviewsGridProps) {
  const t = useTranslations("clientOpinions");

  const videoReviews = reviews.filter((review): review is VideoReview =>
    Boolean(review.video),
  );

  const modal = useReviewModal({ itemCount: videoReviews.length });

  if (videoReviews.length === 0) {
    return <div className={styles.emptyState}>{t("noVideoReviews")}</div>;
  }

  return (
    <div className={styles.gridSection}>
      <span className={styles.rowLabel}>{t("videoReviews")}</span>

      <div className={styles.grid} aria-label={t("aria.videoReviews")}>
        {videoReviews.map((review, index) => (
          <VideoReviewCard
            key={review.id}
            review={review}
            variant="grid"
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
