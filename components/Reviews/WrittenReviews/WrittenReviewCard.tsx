
"use client";

import {
  forwardRef,
  type MouseEvent,
} from "react";
import {
  useTranslations,
  useLocale,
} from "next-intl";

import {
  useCarouselItemContext,
} from "@/components/Carousel/CarouselItemContext";

import type { PublicReview } from "../shared/types";

import styles from "./WrittenReviews.module.css";

interface WrittenReviewCardProps {
  review: WrittenReview;
  onOpen: (
    event: MouseEvent<HTMLButtonElement>,
  ) => void;
  variant?: "carousel" | "grid";
}

export type WrittenReview = PublicReview & {
  reviewType: "written";
  comment: string;
};

const EXCERPT_LENGTH = 160;

function getExcerpt(text: string) {
  if (text.length <= EXCERPT_LENGTH) {
    return text;
  }

  const candidate = text.slice(0, EXCERPT_LENGTH);
  const lastSpace = candidate.lastIndexOf(" ");

  const excerpt =
    lastSpace > 0
      ? candidate.slice(0, lastSpace)
      : candidate;

  return `${excerpt.trimEnd()}…`;
}

const WrittenReviewCard = forwardRef<
  HTMLButtonElement,
  WrittenReviewCardProps
>(function WrittenReviewCard(
  {
    review,
    onOpen,
    variant = "carousel",
  },
  ref,
) {
  const t = useTranslations("clientOpinions");
  const locale = useLocale();

  const { isContinuation } =
    useCarouselItemContext();

  const text =
    review.translations?.[
      locale as "en" | "pl" | "uk" | "ru"
    ] || review.comment;

  const excerpt = getExcerpt(text);

  const formatDate = (isoDate: string) =>
    new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(
      new Date(
        isoDate.includes("T")
          ? isoDate
          : `${isoDate}T00:00:00`,
      ),
    );

  return (
    <button
      ref={isContinuation ? undefined : ref}
      type="button"
      tabIndex={isContinuation ? -1 : undefined}
      onClick={onOpen}
      className={`${styles.card} ${
        variant === "grid"
          ? styles.cardGrid
          : styles.cardCompact
      }`}
    >
      <span className={styles.cardTop}>
        <span
          className={styles.avatar}
          aria-hidden="true"
        >
          {review.name.charAt(0).toUpperCase()}
        </span>

        <span className={styles.cardTopMeta}>
          <span className={styles.cardName}>
            {review.name}
          </span>

          <span className={styles.cardLocation}>
            {review.location}
          </span>

          <span
            className={styles.cardRating}
            aria-label={t("aria.rating", {
              rating: review.rating,
            })}
          >
            {Array.from({ length: 5 }).map(
              (_, index) => (
                <svg
                  key={index}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className={
                    index < review.rating
                      ? styles.starFilled
                      : styles.starEmpty
                  }
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ),
            )}
          </span>
        </span>
      </span>

      <p className={styles.cardText}>
        {excerpt}
      </p>

      

<span className={styles.cardFooter}>
  <span className={styles.cardDate}>
    {formatDate(review.date)}
  </span>

  <span className={styles.cardFooterActions}>
    {review.photoUrl && (
      <span className={styles.photoIndicator}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="3"
          />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="m21 15-5-5L5 21" />
        </svg>

        <span>{t("photoAttached")}</span>
      </span>
    )}

    <span
      className={styles.cardArrow}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 17 17 7M7 7h10v10" />
      </svg>
    </span>
  </span>
</span>


    </button>
  );
});

export default WrittenReviewCard;