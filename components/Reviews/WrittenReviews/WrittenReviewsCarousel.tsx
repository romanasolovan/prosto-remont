"use client";

import { useTranslations } from "next-intl";

import Carousel from "@/components/Carousel/Carousel";

import WrittenReviewCard, {
  type WrittenReview,
} from "./WrittenReviewCard";
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

  const writtenReviews = reviews.filter(
    (review): review is WrittenReview =>
      review.reviewType === "written" &&
      typeof review.comment === "string" &&
      review.comment.trim().length > 0,
  );

  const modal = useReviewModal({
    itemCount: writtenReviews.length,
  });

  if (writtenReviews.length === 0) {
    return null;
  }

  return (
    <div className={styles.carouselSection}>
      <span className={styles.rowLabel}>
        {t("writtenReviews")}
      </span>

      <div className={styles.carouselShell}>
        <Carousel
          ariaLabel={t("aria.writtenReviews")}
          previousLabel={t("aria.scrollPrevious")}
          nextLabel={t("aria.scrollNext")}
          viewportClassName={styles.carouselViewport}
          trackClassName={styles.carouselTrack}
          autoplay
          motionMode="continuous"
          continuousSpeed={40}
          startDelay={300}
          resumeDelay={800}
          loop
          isPaused={modal.isOpen}
        >
          {writtenReviews.map((review, index) => (
            <WrittenReviewCard
              key={review.id}
              review={review}
              variant="carousel"
              onOpen={(event) => {
                modal.open(
                  index,
                  event.currentTarget,
                );
              }}
            />
          ))}
        </Carousel>
      </div>

      {modal.isOpen && (
        <WrittenReviewModal
          reviews={writtenReviews}
          activeIndex={modal.activeIndex}
          onClose={modal.close}
          onNext={modal.next}
          onPrev={modal.prev}
        />
      )}
    </div>
  );
}