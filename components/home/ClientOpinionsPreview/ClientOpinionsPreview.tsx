"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/navigation";
import styles from "./ClientOpinionsPreview.module.css";

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
}

const videoReviews = [
  {
    id: "video-1",
    name: "Sarah",
    label: "Apartment renovation",
  },
  {
    id: "video-2",
    name: "Michael",
    label: "Bathroom renovation",
  },
  {
    id: "video-3",
    name: "Anna",
    label: "Interior finishing",
  },
  {
    id: "video-4",
    name: "David",
    label: "Home renovation",
  },
];

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

  const writtenReviews = comments.slice(0, 6);
  const duplicatedWrittenReviews = [...writtenReviews, ...writtenReviews];
  const duplicatedVideoReviews = [...videoReviews, ...videoReviews];

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

              {/* <h2 className={styles.title} id="client-opinions-preview-title">
                {t("title")}
              </h2> */}
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
                <Link href="/about" className={styles.link}>
                  {t("readMore")}
                  <span aria-hidden="true">→</span>
                </Link>

                <Link href="/about" className={styles.secondaryLink}>
                  {t("cta.leaveReview")}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </header>

          <div className={styles.videoBlock}>
            {/* <div className={styles.rowLabel}>{t("videoReviews")}</div> */}

            <div
              className={styles.videoCarousel}
              aria-label={t("aria.videoReviews")}
            >
              <div className={styles.videoTrack}>
                {duplicatedVideoReviews.map((video, index) => (
                  <button
                    key={`${video.id}-${index}`}
                    className={styles.videoCard}
                    type="button"
                    aria-label={t("aria.playVideo")}
                  >
                    <span className={styles.playIcon} aria-hidden="true">
                      ▶
                    </span>

                    <span className={styles.videoName}>{video.name}</span>
                    <span className={styles.videoLabel}>{video.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.writtenBlock}>
            {/* <div className={styles.rowLabel}>{t("writtenReviews")}</div> */}

            <div
              className={styles.writtenCarousel}
              aria-label={t("aria.writtenReviews")}
            >
              <div className={styles.writtenTrack}>
                {duplicatedWrittenReviews.map((comment, index) => (
                  <article
                    key={`${comment.id}-${index}`}
                    className={styles.reviewCard}
                  >
                    <div className={styles.reviewTop}>
                      <div className={styles.avatar} aria-hidden="true">
                        {comment.name.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <h3 className={styles.author}>{comment.name}</h3>

                        <Stars
                          rating={comment.rating}
                          ariaLabel={t("aria.rating", {
                            rating: comment.rating,
                          })}
                        />
                      </div>
                    </div>

                    <p className={styles.reviewText}>
                      {getLocalizedComment(comment)}
                    </p>

                    <span className={styles.quoteMark} aria-hidden="true">
                      “
                    </span>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
