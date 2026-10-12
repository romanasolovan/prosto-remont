"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import styles from "./ClientOpinions.module.css";
import DataLoader from "@/components/ui/DataLoader/DataLoader";
import LeaveCommentForm from "../Reviews/LeaveCommentForm/LeaveCommentForm";
import VideoReviewsCarousel from "../Reviews/VideoReviews/VideoReviewsCarousel";
import WrittenReviewsGrid from "../Reviews/WrittenReviews/WrittenReviewsGrid";
import type { PublicReview } from "../Reviews/shared/types";
import { submitReview } from "@/lib/submitReview";

export default function ClientOpinions() {
  const t = useTranslations("clientOpinions");
  const tCommon = useTranslations("common");
  const activeTriggerRef = useRef<HTMLButtonElement | null>(null);
  const successTimerRef = useRef<number | null>(null);
  const [reviews, setReviews] = useState<PublicReview[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showSuccessNotice, setShowSuccessNotice] = useState(false);

  useEffect(() => {
    const fetchApprovedReviews = async () => {
      try {
        const response = await fetch("/api/public/reviews");

        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }

        const data = await response.json();

        setReviews(data.reviews || []);
      } catch (error) {
        console.error("Failed to load approved reviews:", error);
        setReviews([]);
      } finally {
        setIsLoadingReviews(false);
      }
    };

    fetchApprovedReviews();
  }, []);

  const handleOpenForm = (
  trigger: HTMLButtonElement,
) => {
  activeTriggerRef.current = trigger;
  setShowForm(true);
  };
  
  const restoreTriggerFocus = () => {
  requestAnimationFrame(() => {
    activeTriggerRef.current?.focus();
  });
};

  const handleCloseForm = () => {
  setShowForm(false);
  restoreTriggerFocus();
};

  const handleNewComment = () => {
  setShowForm(false);
  setShowSuccessNotice(true);

  if (successTimerRef.current !== null) {
    window.clearTimeout(successTimerRef.current);
  }

  successTimerRef.current = window.setTimeout(() => {
    setShowSuccessNotice(false);
    successTimerRef.current = null;
  }, 5000);

  restoreTriggerFocus();
};

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "0.0";

  const reviewLabel = t("reviewCount", { count: reviews.length });

  return (
    <section
      className={styles.opinionsContainer}
      aria-labelledby="reviews-title"
    >
      
<div className={styles.header}>
  <div className={styles.headerContent}>
    <span className={styles.pageEyebrow}>
      {t("pageEyebrow")}
    </span>

    <h1 id="reviews-title" className={styles.title}>
      {t("title")}
    </h1>

    <p className={styles.pageIntroduction}>
      {t("pageIntroduction")}
    </p>

    <div className={styles.stats}>
      <div className={styles.rating}>
        <span className={styles.ratingNumber}>
          {averageRating}
        </span>

        <div
          className={styles.stars}
          aria-label={t("aria.stars")}
        >
          {Array.from({ length: 5 }).map(
            (_, index) => (
              <svg
                key={index}
                className={
                  index <
                  Math.round(Number(averageRating))
                    ? styles.starFilled
                    : styles.starEmpty
                }
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292z" />
              </svg>
            ),
          )}
        </div>
      </div>

      <span className={styles.reviewCount}>
        {reviewLabel}
      </span>
    </div>
  </div>

  <button
    onClick={(event) =>
  handleOpenForm(event.currentTarget)
}
    className={styles.leaveReviewButton}
    type="button"
  >
    <span>{t("shareExperience")}</span>

    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7 17 17 7M7 7h10v10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </button>
</div>

      {showSuccessNotice && (
        <div className={styles.successNotice} role="status" aria-live="polite">
          {t("success.reviewSubmitted")}
        </div>
      )}

      {isLoadingReviews ? (
        <DataLoader label={tCommon("loading.reviews")} />
      ) : (
        <div className={styles.sectionsStack}>
           <VideoReviewsCarousel reviews={reviews} />
          <WrittenReviewsGrid reviews={reviews} isLoading={isLoadingReviews} />
        </div>
      )}

            <section
        className={styles.storySection}
        aria-labelledby="reviews-story-title"
      >
        <h2
          id="reviews-story-title"
          className={styles.storyTitle}
        >
          {t("storyTitle")}
        </h2>

        <p className={styles.storyDescription}>
          {t("storyDescription")}
        </p>

        <button
          type="button"
          className={styles.storyButton}
          onClick={(event) =>
            handleOpenForm(event.currentTarget)
          }
        >
          <span>{t("cta.leaveReview")}</span>

          <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M7 17 17 7M7 7h10v10"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </section>

      {showForm && (
        <LeaveCommentForm
          onSubmit={async (data) => {
            await submitReview(data);
            handleNewComment();
          }}
          onCancel={handleCloseForm}
        />
      )}
    </section>
  );
}