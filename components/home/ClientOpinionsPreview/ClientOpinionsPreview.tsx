"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import styles from "./ClientOpinionsPreview.module.css";
import { clientFetchJson } from "@/lib/clientFetchJson";
import LeaveCommentForm from "../../Reviews/LeaveCommentForm/LeaveCommentForm";
import VideoReviewsCarousel from "../../Reviews/VideoReviews/VideoReviewsCarousel";
import WrittenReviewsCarousel from "../../Reviews/WrittenReviews/WrittenReviewsCarousel";
import type { PublicReview } from "../../Reviews/shared/types";

function Stars({ rating, ariaLabel }: { rating: number; ariaLabel: string }) {
  return (
    <div className={styles.stars} aria-label={ariaLabel}>
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={index < rating ? styles.starFilled : styles.starEmpty}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ClientOpinionsPreview() {
  const t = useTranslations("clientOpinions");
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const successTimerRef = useRef<number | null>(null);

  const [reviews, setReviews] = useState<PublicReview[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showSuccessNotice, setShowSuccessNotice] = useState(false);

  useEffect(() => {
    const fetchApprovedReviews = async () => {
      try {
        const data = await clientFetchJson<{ reviews: PublicReview[] }>(
          "/api/public/reviews",
          { reviews: [] },
        );

        setReviews(data.reviews || []);
      } catch (error) {
        console.error("Failed to load preview reviews:", error);
        setReviews([]);
      } finally {
        setIsLoadingReviews(false);
      }
    };

    fetchApprovedReviews();
  }, []);

  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  };

  const handleNewComment = () => {
    setShowForm(false);
    setShowSuccessNotice(true);

    if (successTimerRef.current) {
      window.clearTimeout(successTimerRef.current);
    }

    successTimerRef.current = window.setTimeout(() => {
      setShowSuccessNotice(false);
    }, 5000);

    requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
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
      className={styles.section}
      aria-labelledby="client-opinions-preview-title"
    >
      <div className="container">
        <div className={styles.inner}>
          <header className={styles.header}>
            <div className={styles.heading}>
              <span className={styles.label}>{t("eyebrow")}</span>
            </div>

            <div className={styles.meta}>
              <div className={styles.ratingBox}>
                <span className={styles.rating}>{averageRating}</span>

                <div className={styles.ratingDetails}>
                  <Stars
                    rating={Math.round(Number(averageRating))}
                    ariaLabel={t("aria.stars")}
                  />

                  <span className={styles.count}>{reviewLabel}</span>
                </div>
              </div>

              <div className={styles.actions}>
                <Link href="/reviews" className={styles.link}>
                  {t("readMore")}
                  <span aria-hidden="true">→</span>
                </Link>

                <button
                  ref={triggerRef}
                  type="button"
                  onClick={handleOpenForm}
                  className={styles.secondaryLink}
                >
                  {t("cta.leaveReview")}
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </header>

          {showSuccessNotice && (
            <div
              className={styles.successNotice}
              role="status"
              aria-live="polite"
            >
              {t("success.reviewSubmitted")}
            </div>
          )}

          {!isLoadingReviews && (
            <>
              <VideoReviewsCarousel reviews={reviews} />
              <WrittenReviewsCarousel reviews={reviews} />
            </>
          )}
        </div>
      </div>

      {showForm && (
        <LeaveCommentForm
          onSubmit={async (data) => {
            const formData = new FormData();

            formData.append("name", data.name);
            formData.append("rating", String(data.rating));
            formData.append("comment", data.comment);
            formData.append("location", data.location);

            if (data.photo) {
              formData.append("photo", data.photo);
            }

            const response = await fetch("/api/submit-review", {
              method: "POST",
              body: formData,
            });

            if (!response.ok) {
              throw new Error("Failed to submit review");
            }

            handleNewComment();
          }}
          onCancel={handleCloseForm}
        />
      )}
    </section>
  );
}
