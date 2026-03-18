"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Formik } from "formik";
import * as Yup from "yup";
import styles from "./LeaveCommentForm.module.css";

export interface LeaveCommentFormProps {
  onSubmit: (data: {
    name: string;
    rating: number;
    comment: string;
  }) => void | Promise<void>;
  onCancel: () => void;
}

type FormValues = {
  name: string;
  rating: number;
  comment: string;
};

const NAME_MIN = 2;
const NAME_MAX = 50;
const COMMENT_MIN = 10;
const COMMENT_MAX = 500;

const ErrorSlot = ({ id, error }: { id: string; error?: string }) => (
  <div className={styles.errorSlot} aria-live="polite">
    <div id={id} className={`${styles.error} ${error ? styles.visible : ""}`}>
      {error || "\u00A0"}
    </div>
  </div>
);

export default function LeaveCommentForm({
  onSubmit,
  onCancel,
}: LeaveCommentFormProps) {
  const t = useTranslations("leaveComment");
  const [hoveredRating, setHoveredRating] = useState(0);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [shake, setShake] = useState(false);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);

  const firstInputRef = useRef<HTMLInputElement | null>(null);
  const shakeTimeoutRef = useRef<number | null>(null);

  const initialValues: FormValues = {
    name: "",
    rating: 0,
    comment: "",
  };

  const triggerShake = () => {
    if (shakeTimeoutRef.current) {
      window.clearTimeout(shakeTimeoutRef.current);
    }

    setShake(true);

    shakeTimeoutRef.current = window.setTimeout(() => {
      setShake(false);
    }, 420);
  };

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    requestAnimationFrame(() => {
      firstInputRef.current?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCancel();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);

      if (shakeTimeoutRef.current) {
        window.clearTimeout(shakeTimeoutRef.current);
      }
    };
  }, [onCancel]);

  const validationSchema = useMemo(
    () =>
      Yup.object({
        name: Yup.string()
          .transform((value) =>
            typeof value === "string" ? value.trim() : value,
          )
          .required(t("validation.requiredName"))
          .min(NAME_MIN, t("validation.nameMin", { count: NAME_MIN }))
          .max(NAME_MAX, t("validation.nameMax", { count: NAME_MAX })),
        rating: Yup.number()
          .required(t("validation.requiredRating"))
          .min(1, t("validation.requiredRating"))
          .max(5, t("validation.requiredRating")),
        comment: Yup.string()
          .transform((value) =>
            typeof value === "string" ? value.trim() : value,
          )
          .required(t("validation.requiredComment"))
          .min(COMMENT_MIN, t("validation.commentMin", { count: COMMENT_MIN }))
          .max(COMMENT_MAX, t("validation.commentMax", { count: COMMENT_MAX })),
      }),
    [t],
  );

  return (
    <div
      className={styles.modalOverlay}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onCancel();
        }
      }}
    >
      <div
        className={`${styles.modalDialog} ${shake ? styles.formShake : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="leave-review-title"
        aria-describedby="leave-review-description"
      >
        <div className={styles.modalHeader}>
          <div>
            <p className={styles.eyebrow}>PRO100REMONT</p>
            <h3 id="leave-review-title" className={styles.formTitle}>
              {isSuccessVisible ? "Thank you for your words" : t("title")}
            </h3>
            <p id="leave-review-description" className={styles.formDescription}>
              {isSuccessVisible
                ? "Your message has been received and is now waiting for review."
                : t("description")}
            </p>
          </div>

          <button
            type="button"
            onClick={onCancel}
            className={styles.closeButton}
            aria-label={t("aria.closeModal")}
          >
            ×
          </button>
        </div>

        {isSuccessVisible ? (
          <div className={styles.successExperience} aria-live="polite">
            <div className={styles.successHalo} aria-hidden="true" />
            <div className={styles.successOrbitalLine} aria-hidden="true" />
            <div className={styles.successBadge}>With gratitude</div>

            <div className={styles.successIconWrap} aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className={styles.successIcon}
              >
                <path
                  d="M20 7L9.5 17.5L4 12"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h4 className={styles.successTitle}>
              Thank you for sharing your experience.
            </h4>

            <p className={styles.successText}>
              We appreciate the time you took to leave a thoughtful message.
              Every comment is reviewed with care before it appears, so it may
              take a little time.
            </p>

            <div className={styles.successDetailRow}>
              <span className={styles.successPill}>Reviewed with care</span>
              <span className={styles.successPill}>Added thoughtfully</span>
            </div>

            <button
              type="button"
              onClick={onCancel}
              className={styles.successCloseButton}
            >
              Close
            </button>
          </div>
        ) : (
          <Formik<FormValues>
            initialValues={initialValues}
            validationSchema={validationSchema}
            validateOnBlur
            validateOnChange={attemptedSubmit}
            onSubmit={async (values, helpers) => {
              await onSubmit({
                name: values.name.trim(),
                rating: values.rating,
                comment: values.comment.trim(),
              });

              helpers.resetForm();
              helpers.setSubmitting(false);
              setAttemptedSubmit(false);
              setHoveredRating(0);
              setIsSuccessVisible(true);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              setFieldTouched,
              isSubmitting,
              validateForm,
            }) => {
              const commentLength = values.comment.trim().length;

              return (
                <form
                  onSubmit={async (event) => {
                    event.preventDefault();

                    const validationErrors = await validateForm();
                    const hasErrors = Object.keys(validationErrors).length > 0;

                    if (hasErrors) {
                      setAttemptedSubmit(true);
                      triggerShake();
                      return;
                    }

                    await handleSubmit();
                  }}
                  className={styles.form}
                  noValidate
                >
                  <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>
                      {t("fields.name")}{" "}
                      <span className={styles.required}>*</span>
                    </label>

                    <input
                      ref={firstInputRef}
                      type="text"
                      id="name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder={t("placeholders.name")}
                      className={styles.input}
                      autoComplete="name"
                      maxLength={NAME_MAX}
                      aria-invalid={Boolean(
                        (touched.name || attemptedSubmit) && errors.name,
                      )}
                      aria-describedby="name-error"
                    />

                    <ErrorSlot
                      id="name-error"
                      error={
                        touched.name || attemptedSubmit
                          ? (errors.name as string)
                          : ""
                      }
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <span className={styles.label}>
                      {t("fields.rating")}{" "}
                      <span className={styles.required}>*</span>
                    </span>

                    <div
                      className={styles.ratingInput}
                      role="radiogroup"
                      aria-label={t("fields.rating")}
                      aria-describedby="rating-error"
                    >
                      {[1, 2, 3, 4, 5].map((star) => {
                        const checked = values.rating === star;

                        return (
                          <button
                            key={star}
                            type="button"
                            role="radio"
                            aria-checked={checked}
                            tabIndex={
                              checked || (values.rating === 0 && star === 1)
                                ? 0
                                : -1
                            }
                            onClick={() => {
                              setFieldValue("rating", star, false);
                              setFieldTouched("rating", false, false);

                              if (attemptedSubmit) {
                                setAttemptedSubmit(false);
                              }
                            }}
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                            className={styles.starButton}
                            aria-label={t("aria.selectRating", {
                              rating: star,
                            })}
                          >
                            <svg
                              className={
                                star <= (hoveredRating || values.rating)
                                  ? styles.starFilled
                                  : styles.starEmpty
                              }
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              aria-hidden="true"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </button>
                        );
                      })}
                    </div>

                    <ErrorSlot
                      id="rating-error"
                      error={
                        attemptedSubmit && values.rating < 1
                          ? (errors.rating as string)
                          : ""
                      }
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="comment" className={styles.label}>
                      {t("fields.comment")}{" "}
                      <span className={styles.required}>*</span>
                    </label>

                    <textarea
                      id="comment"
                      name="comment"
                      value={values.comment}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder={t("placeholders.comment")}
                      rows={5}
                      className={styles.textarea}
                      maxLength={COMMENT_MAX}
                      aria-invalid={Boolean(
                        (touched.comment || attemptedSubmit) && errors.comment,
                      )}
                      aria-describedby="comment-meta comment-error"
                    />

                    <div id="comment-meta" className={styles.metaRow}>
                      <span className={styles.helperText}>
                        {t("validation.commentMin", { count: COMMENT_MIN })}
                      </span>
                      <span className={styles.counter}>
                        {commentLength}/{COMMENT_MAX}
                      </span>
                    </div>

                    <ErrorSlot
                      id="comment-error"
                      error={
                        touched.comment || attemptedSubmit
                          ? (errors.comment as string)
                          : ""
                      }
                    />
                  </div>

                  <div className={styles.buttonGroup}>
                    <button
                      type="button"
                      onClick={onCancel}
                      className={styles.cancelButton}
                      disabled={isSubmitting}
                    >
                      {t("buttons.cancel")}
                    </button>

                    <button
                      type="submit"
                      className={styles.submitButton}
                      disabled={isSubmitting}
                    >
                      {isSubmitting
                        ? t("buttons.submitting")
                        : t("buttons.submit")}
                    </button>
                  </div>
                </form>
              );
            }}
          </Formik>
        )}
      </div>
    </div>
  );
}
