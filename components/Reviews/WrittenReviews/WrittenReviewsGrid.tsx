"use client";

import { useTranslations } from "next-intl";

import DataLoader from "@/components/ui/DataLoader/DataLoader";

import WrittenReviewCard from "./WrittenReviewCard";
import WrittenReviewModal from "./WrittenReviewModal";
import { useReviewModal } from "../shared/useReviewModal";
import type { PublicReview } from "../shared/types";

import styles from "./WrittenReviews.module.css";

interface WrittenReviewsGridProps {
  reviews: PublicReview[];
  isLoading: boolean;
}

export default function WrittenReviewsGrid({
  reviews,
  isLoading,
}: WrittenReviewsGridProps) {
  const t = useTranslations("clientOpinions");
  const loadingT = useTranslations("loading");

  const modal = useReviewModal({
    itemCount: reviews.length,
  });

  if (isLoading) {
    return (
      <div className={styles.gridLoader}>
        <DataLoader label={loadingT("reviews")} />
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className={styles.emptyState}>
        {t("noWrittenReviews")}
      </div>
    );
  }

  return (
    <div className={styles.gridSection}>
      <span className={styles.rowLabel}>
        {t("writtenReviews")}
      </span>

      <div
        className={styles.grid}
        aria-label={t("aria.writtenReviews")}
      >
        {reviews.map((review, index) => (
          <WrittenReviewCard
            key={review.id}
            review={review}
            variant="grid"
            onOpen={(event) =>
              modal.open(index, event.currentTarget)
            }
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