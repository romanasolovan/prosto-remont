"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { clientFetchJson } from "@/lib/clientFetchJson";
import { submitReview } from "@/lib/submitReview";
import DataLoader from "@/components/ui/DataLoader/DataLoader";
import LeaveCommentForm from "../../Reviews/LeaveCommentForm/LeaveCommentForm";
import VideoReviewsCarousel from "../../Reviews/VideoReviews/VideoReviewsCarousel";
import WrittenReviewsCarousel from "../../Reviews/WrittenReviews/WrittenReviewsCarousel";
import type { PublicReview } from "../../Reviews/shared/types";
import styles from "./ClientOpinionsPreview.module.css";

interface StarsProps {
  rating: number;
  ariaLabel: string;
}

function Stars({ rating, ariaLabel }: StarsProps) {
  return (
    <div className={styles.stars} aria-label={ariaLabel}>
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          className={
            index < rating
              ? styles.starFilled
              : styles.starEmpty
          }
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ClientOpinionsPreview() {
  const t = useTranslations("clientOpinions");
  const tCommon = useTranslations("common");

  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const [reviews, setReviews] = useState<PublicReview[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Load approved reviews.
  useEffect(() => {
    let isActive = true;

    const fetchApprovedReviews = async () => {
      try {
        const data = await clientFetchJson<{
          reviews: PublicReview[];
        }>("/api/public/reviews", { reviews: [] });

        if (isActive) {
          setReviews(data.reviews ?? []);
        }
      } catch (error) {
        if (isActive) {
          console.error(
            "Failed to load preview reviews:",
            error,
          );
          setReviews([]);
        }
      } finally {
        if (isActive) {
          setIsLoadingReviews(false);
        }
      }
    };

    void fetchApprovedReviews();

    return () => {
      isActive = false;
    };
  }, []);

  // Review form interactions.
  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);

    requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  };

  // Review statistics.
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce(
            (sum, review) => sum + review.rating,
            0,
          ) / reviews.length
        ).toFixed(1)
      : "0.0";

  const reviewLabel = t("reviewCount", {
    count: reviews.length,
  });

  return (
    <section
      className={styles.section}
      aria-labelledby="client-opinions-preview-title"
    >
      <div className="container">
        <div className={styles.inner}>
          <header className={styles.header}>
            <div className={styles.heading}>
              <h2
                id="client-opinions-preview-title"
                className={styles.label}
              >
                {t("eyebrow")}
              </h2>
            </div>

            <div className={styles.meta}>
              <div className={styles.ratingGroup}>
                <div className={styles.ratingBox}>
                  <span className={styles.rating}>
                    {averageRating}
                  </span>

                  <div className={styles.ratingDetails}>
                    <Stars
                      rating={Math.round(Number(averageRating))}
                      ariaLabel={t("aria.stars")}
                    />

                    <span className={styles.count}>
                      {reviewLabel}
                    </span>
                  </div>
                </div>

                <Link
                  href="/reviews"
                  className={styles.primaryReviewLink}
                >
                  <span>{t("readMore")}</span>

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
                </Link>
              </div>
            </div>
          </header>

          {isLoadingReviews ? (
            <div className={styles.reviewsLoader}>
              <DataLoader label={tCommon("loading.reviews")} />
            </div>
          ) : (
            <>
              <VideoReviewsCarousel reviews={reviews} />
              <WrittenReviewsCarousel reviews={reviews} />
            </>
          )}

          <div className={styles.reviewInvitation}>
            <p className={styles.invitationText}>
              {t("homeInvitation")}
            </p>

            <button
              ref={triggerRef}
              type="button"
              className={styles.invitationButton}
              onClick={handleOpenForm}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M8 3.75h7l4 4V20.25H5V3.75h3Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M15 3.75v4h4M8.5 12h7M8.5 15.5h5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span>{t("cta.leaveReview")}</span>
            </button>
          </div>
        </div>
      </div>

      {showForm && (
        <LeaveCommentForm
          onSubmit={submitReview}
          onCancel={handleCloseForm}
        />
      )}
    </section>
  );
}
