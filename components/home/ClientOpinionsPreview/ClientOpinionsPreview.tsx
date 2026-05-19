"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/navigation";
import styles from "./ClientOpinionsPreview.module.css";
import { useEffect, useState } from "react";

interface Comment {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export default function ClientOpinionsPreview() {
  const t = useTranslations("clientOpinions");
  const locale = useLocale();

  const [comments, setComments] = useState<Comment[]>([]);

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
        console.error("Failed to load preview reviews:", error);
        setComments([]);
      }
    };

    fetchApprovedReviews();
  }, []);

  const featuredComments = comments.slice(0, 2);

  const averageRating =
    comments.length > 0
      ? (
          comments.reduce((sum, comment) => sum + comment.rating, 0) /
          comments.length
        ).toFixed(1)
      : "0.0";

  const reviewLabel = t("reviewCount", { count: comments.length });

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);

    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return (
    <section
      className={styles.clientOpinionsPreviewSection}
      aria-labelledby="client-opinions-preview-title"
    >
      <div className="container">
        <div className={styles.clientOpinionsPreviewIntro}>
          <span className={styles.sectionLabel}>Client opinions</span>

          <h2
            className={styles.clientOpinionsPreviewTitle}
            id="client-opinions-preview-title"
          >
            Confidence is built through the experience clients carry away
          </h2>

          <p className={styles.clientOpinionsPreviewDescription}>
            Good projects leave an impression long after completion. These
            selected reviews reflect the clarity, care, and trust that shape the
            process as much as the final result.
          </p>
        </div>

        <div className={styles.clientOpinionsPreviewTop}>
          <div className={styles.clientOpinionsPreviewStats}>
            <span className={styles.clientOpinionsPreviewRating}>
              {averageRating}
            </span>

            <div
              className={styles.clientOpinionsPreviewStars}
              aria-label={t("aria.stars")}
            >
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={
                    index < Math.round(Number(averageRating))
                      ? styles.clientOpinionsPreviewStarFilled
                      : styles.clientOpinionsPreviewStarEmpty
                  }
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            <span className={styles.clientOpinionsPreviewCount}>
              {reviewLabel}
            </span>
          </div>

          <div className={styles.clientOpinionsPreviewActions}>
            <Link href="/about" className={styles.sectionLink}>
              Read client opinions
              <span className={styles.linkArrow} aria-hidden="true">
                →
              </span>
            </Link>

            <Link
              href="/about"
              className={styles.clientOpinionsPreviewSecondaryLink}
            >
              Leave a review
              <span className={styles.linkArrow} aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>

        <div className={styles.clientOpinionsPreviewGrid}>
          {featuredComments.map((comment) => (
            <article
              key={comment.id}
              className={styles.clientOpinionsPreviewCard}
            >
              <div
                className={styles.clientOpinionsPreviewQuoteMark}
                aria-hidden="true"
              >
                “
              </div>

              <div className={styles.clientOpinionsPreviewCardHeader}>
                <div className={styles.clientOpinionsPreviewAuthor}>
                  <div
                    className={styles.clientOpinionsPreviewAvatar}
                    aria-hidden="true"
                  >
                    {comment.name.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <div className={styles.clientOpinionsPreviewAuthorName}>
                      {comment.name}
                    </div>

                    <div className={styles.clientOpinionsPreviewDate}>
                      {formatDate(comment.date)}
                    </div>
                  </div>
                </div>

                <div
                  className={styles.clientOpinionsPreviewCardRating}
                  aria-label={t("aria.rating", { rating: comment.rating })}
                >
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className={
                        index < comment.rating
                          ? styles.clientOpinionsPreviewStarFilled
                          : styles.clientOpinionsPreviewStarEmpty
                      }
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.570-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>

              <p className={styles.clientOpinionsPreviewText}>
                {comment.comment}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
