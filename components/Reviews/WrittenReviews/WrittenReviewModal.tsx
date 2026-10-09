"use client";

import { useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { createPortal } from "react-dom";
import type { PublicReview } from "../shared/types";
import styles from "./WrittenReviewModal.module.css";
import Image from "next/image";

interface WrittenReviewModalProps {
  reviews: PublicReview[];
  activeIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function WrittenReviewModal({
  reviews,
  activeIndex,
  onClose,
  onNext,
  onPrev,
}: WrittenReviewModalProps) {
  const t = useTranslations("clientOpinions");
  const locale = useLocale();
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const activeReview = reviews[activeIndex];

  useEffect(() => {
    closeButtonRef.current?.focus();
    textRef.current?.scrollTo({ top: 0 });
  }, [activeIndex]);

  if (!activeReview) {
    return null;
  }

  const text =
    activeReview.translations?.[
      locale as "en" | "pl" | "uk" | "ru"
    ] || activeReview.comment;

  
const hasPhoto = Boolean(activeReview.photoUrl);

const hasValidPhotoDimensions =
  typeof activeReview.photoWidth === "number" &&
  typeof activeReview.photoHeight === "number" &&
  Number.isFinite(activeReview.photoWidth) &&
  Number.isFinite(activeReview.photoHeight) &&
  activeReview.photoWidth > 0 &&
  activeReview.photoHeight > 0;

const photoWidth = hasValidPhotoDimensions
  ? activeReview.photoWidth!
  : 1200;

const photoHeight = hasValidPhotoDimensions
  ? activeReview.photoHeight!
  : 1200;
  
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

  return createPortal(
    <div
      className={styles.modalOverlay}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className={styles.modalDialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="written-review-modal-name"
      >
       
<div className={styles.modalTopBar}>
  <button
    type="button"
    ref={closeButtonRef}
    className={styles.modalCloseButton}
    onClick={onClose}
    aria-label={t("aria.closeReview")}
  >
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </button>
</div>
        <div
          className={`${styles.modalContent} ${
            hasPhoto ? styles.modalWithPhoto : ""
          }`}
        >
          <div className={styles.modalReviewColumn}>
            <div className={styles.modalHeader}>
              <span
                className={styles.avatar}
                aria-hidden="true"
              >
                {activeReview.name.charAt(0).toUpperCase()}
              </span>

              <div className={styles.modalHeaderMeta}>
                <h3
                  id="written-review-modal-name"
                  className={styles.modalName}
                >
                  {activeReview.name}
                </h3>

                <span className={styles.modalLocationDate}>
                  {activeReview.location} ·{" "}
                  {formatDate(activeReview.date)}
                </span>
              </div>
            </div>

            <span
              className={styles.modalRating}
              aria-label={t("aria.rating", {
                rating: activeReview.rating,
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
                      index < activeReview.rating
                        ? styles.starFilled
                        : styles.starEmpty
                    }
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ),
              )}
            </span>

            
<div
  ref={textRef}
  className={styles.modalTextScroll}
  tabIndex={0}
>
  <p className={styles.modalText}>{text}</p>

  
{activeReview.photoUrl && (
  <div className={styles.modalMobilePhoto}>
    <Image
      src={activeReview.photoUrl}
      alt=""
      width={photoWidth}
      height={photoHeight}
      sizes="(max-width: 767px) 100vw, 1px"
      className={styles.modalPhoto}
    />
  </div>
)}

  {activeReview.googleReviewUrl && (
    <a
      href={activeReview.googleReviewUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.googleLink}
    >
      {t("viewOnGoogle")}
    </a>
  )}
</div>
          </div>


{activeReview.photoUrl && (
  <div className={styles.modalPhotoColumn}>
    <Image
      src={activeReview.photoUrl}
      alt=""
      width={photoWidth}
      height={photoHeight}
      sizes="(min-width: 768px) 360px, 1px"
      className={styles.modalPhoto}
    />
  </div>
)}
        </div>
        {reviews.length > 1 && (
          <div className={styles.modalNavRow}>
            <button
              type="button"
              className={styles.modalNavButton}
              onClick={onPrev}
              aria-label={t("aria.previousReview")}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M15 6l-6 6 6 6"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              type="button"
              className={styles.modalNavButton}
              onClick={onNext}
              aria-label={t("aria.nextReview")}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M9 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}