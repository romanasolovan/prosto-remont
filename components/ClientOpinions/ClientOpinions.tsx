"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import styles from "./ClientOpinions.module.css";
import LeaveCommentForm from "./LeaveCommentForm";

interface Comment {
  id: string;
  name: string;
  rating: number;
  comment: string;
  translations?: {
    en?: string;
    pl?: string;
    uk?: string;
    ru?: string;
  };
  date: string;
  photoUrl?: string;
  videoUrl?: string;
}

export default function ClientOpinions() {
  const t = useTranslations("clientOpinions");
  const locale = useLocale();
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const successTimerRef = useRef<number | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
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

        setComments(data.reviews || []);
      } catch (error) {
        console.error("Failed to load approved reviews:", error);
        setComments([]);
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

  const getLocalizedComment = (comment: Comment) => {
    const translatedText =
      comment.translations?.[locale as "en" | "pl" | "uk" | "ru"];

    return translatedText || comment.comment;
  };

  const averageRating =
    comments.length > 0
      ? (
          comments.reduce((sum, comment) => sum + comment.rating, 0) /
          comments.length
        ).toFixed(1)
      : "0.0";

  const reviewLabel = t("reviewCount", { count: comments.length });

  const formatDate = (isoDate: string) => {
    const date = new Date(
      isoDate.includes("T") ? isoDate : `${isoDate}T00:00:00`,
    );

    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return (
    <section
      className={styles.opinionsContainer}
      aria-labelledby="reviews-title"
    >
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h2 id="reviews-title" className={styles.title}>
            {t("title")}
          </h2>

          <div className={styles.stats}>
            <div className={styles.rating}>
              <span className={styles.ratingNumber}>{averageRating}</span>

              <div className={styles.stars} aria-label={t("aria.stars")}>
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={
                      index < Math.round(Number(averageRating))
                        ? styles.starFilled
                        : styles.starEmpty
                    }
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            <span className={styles.reviewCount}>{reviewLabel}</span>
          </div>
        </div>

        <button
          ref={triggerRef}
          onClick={handleOpenForm}
          className={styles.leaveReviewButton}
          type="button"
        >
          {t("cta.leaveReview")}
        </button>
      </div>

      {showSuccessNotice && (
        <div className={styles.successNotice} role="status" aria-live="polite">
          {t("success.reviewSubmitted")}
        </div>
      )}

      <div className={styles.commentsGrid}>
        {comments.map((comment) => (
          <article key={comment.id} className={styles.commentCard}>
            <div className={styles.commentHeader}>
              <div className={styles.commentAuthor}>
                <div className={styles.authorAvatar} aria-hidden="true">
                  {comment.name.charAt(0).toUpperCase()}
                </div>

                <div>
                  <div className={styles.authorName}>{comment.name}</div>
                  <div className={styles.commentDate}>
                    {formatDate(comment.date)}
                  </div>
                </div>
              </div>

              <div
                className={styles.commentRating}
                aria-label={t("aria.rating", { rating: comment.rating })}
              >
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={
                      index < comment.rating
                        ? styles.starFilled
                        : styles.starEmpty
                    }
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            <p className={styles.commentText}>{getLocalizedComment(comment)}</p>
          </article>
        ))}
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
