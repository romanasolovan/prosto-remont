"use client";

import { useTranslations } from "next-intl";

import Carousel from "@/components/Carousel/Carousel";

import type { PublicReview } from "../shared/types";
import { useReviewModal } from "../shared/useReviewModal";
import VideoReviewCard, {
  type VideoReview,
} from "./VideoReviewCard";
import VideoReviewModal from "./VideoReviewModal";

import styles from "./VideoReviews.module.css";

interface VideoReviewsCarouselProps {
  reviews: PublicReview[];
}

export default function VideoReviewsCarousel({
  reviews,
}: VideoReviewsCarouselProps) {
  const t = useTranslations("clientOpinions");

  const videoReviews = reviews.filter(
    (review): review is VideoReview =>
      Boolean(review.video),
  );

  const modal = useReviewModal({
    itemCount: videoReviews.length,
  });

  if (videoReviews.length === 0) {
    return null;
  }

  return (
    <div className={styles.carouselSection}>
      <span className={styles.rowLabel}>
        {t("videoReviews")}
      </span>

      <div className={styles.carouselShell}>
        <Carousel
          ariaLabel={t("aria.videoReviews")}
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
          {videoReviews.map((review, index) => (
            <VideoReviewCard
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