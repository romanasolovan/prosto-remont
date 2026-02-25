"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Formik } from "formik";
import * as Yup from "yup";
import styles from "./LeaveCommentForm.module.css";

interface LeaveCommentFormProps {
  onSubmit: (data: { name: string; rating: number; comment: string }) => void;
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

const ErrorSlot = ({ error }: { error?: string }) => (
  <div className={styles.errorSlot} aria-live="polite">
    <div className={`${styles.error} ${error ? styles.visible : ""}`}>
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
  const [showSuccess, setShowSuccess] = useState(false);

  const initialValues: FormValues = {
    name: "",
    rating: 0,
    comment: "",
  };

  const triggerShake = () => {
    setShake(true);
    window.setTimeout(() => setShake(false), 420);
  };

  const validationSchema = useMemo(
    () =>
      Yup.object({
        name: Yup.string()
          .transform((v) => (typeof v === "string" ? v.trim() : v))
          .required(t("validation.requiredName"))
          .min(NAME_MIN, t("validation.nameMin", { count: NAME_MIN }))
          .max(NAME_MAX, t("validation.nameMax", { count: NAME_MAX })),
        rating: Yup.number()
          .min(1, t("validation.requiredRating"))
          .max(5, t("validation.requiredRating"))
          .required(t("validation.requiredRating")),
        comment: Yup.string()
          .transform((v) => (typeof v === "string" ? v.trim() : v))
          .required(t("validation.requiredComment"))
          .min(COMMENT_MIN, t("validation.commentMin", { count: COMMENT_MIN }))
          .max(COMMENT_MAX, t("validation.commentMax", { count: COMMENT_MAX })),
      }),
    [t],
  );

  const stopAttemptedSubmit = () => {
    if (attemptedSubmit) setAttemptedSubmit(false);
  };

  const successTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (successTimerRef.current) window.clearTimeout(successTimerRef.current);
      successTimerRef.current = window.setTimeout(
        () => setShowSuccess(false),
        5000,
      );
    };
  }, []);

  return (
    <div className={styles.formContainer}>
      <h3 className={styles.formTitle}>{t("title")}</h3>
      <p className={styles.formDescription}>{t("description")}</p>

      {showSuccess && (
        <div className={styles.successBanner} role="status" aria-live="polite">
          <strong>{t("success.title")}</strong>
          <span>{t("success.message")}</span>
        </div>
      )}

      <Formik<FormValues>
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnMount
        validateOnBlur
        validateOnChange={false}
        onSubmit={(values, helpers) => {
          onSubmit({
            name: values.name.trim(),
            rating: values.rating,
            comment: values.comment.trim(),
          });

          setAttemptedSubmit(false);
          setShowSuccess(true);
          setHoveredRating(0);

          helpers.resetForm();
          helpers.setSubmitting(false);

          if (successTimerRef.current)
            window.clearTimeout(successTimerRef.current);
          successTimerRef.current = window.setTimeout(
            () => setShowSuccess(false),
            5000,
          );
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
          isValid,
        }) => {
          const canSubmit =
            values.name.trim().length > 0 &&
            values.rating >= 1 &&
            values.comment.trim().length > 0 &&
            isValid &&
            !isSubmitting;

          return (
            <form
              onSubmit={(e) => {
                // If invalid, block submit and do a subtle shake
                if (!canSubmit) {
                  e.preventDefault();
                  setAttemptedSubmit(true);
                  triggerShake();
                  return;
                }
                handleSubmit(e);
              }}
              className={`${styles.form} ${shake ? styles.formShake : ""}`}
              noValidate
            >
              {/* Name */}
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>
                  {t("fields.name")} <span className={styles.required}>*</span>
                </label>

                <input
                  type="text"
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={(e) => {
                    stopAttemptedSubmit();
                    handleChange(e);
                  }}
                  onBlur={handleBlur}
                  placeholder={t("placeholders.name")}
                  className={styles.input}
                  aria-invalid={Boolean(
                    (touched.name || attemptedSubmit) && errors.name,
                  )}
                  aria-describedby="name-error"
                />

                <div id="name-error">
                  <ErrorSlot
                    error={
                      touched.name || attemptedSubmit
                        ? (errors.name as string)
                        : ""
                    }
                  />
                </div>
              </div>

              {/* Rating */}
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  {t("fields.rating")}{" "}
                  <span className={styles.required}>*</span>
                </label>

                <div
                  className={styles.ratingInput}
                  role="radiogroup"
                  aria-label={t("fields.rating")}
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => {
                        stopAttemptedSubmit();
                        setFieldValue("rating", star);
                        setFieldTouched("rating", true, false);
                      }}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className={styles.starButton}
                      aria-label={t("aria.selectRating", { rating: star })}
                      aria-pressed={values.rating === star}
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
                  ))}
                </div>

                <ErrorSlot
                  error={
                    touched.rating || attemptedSubmit
                      ? (errors.rating as string)
                      : ""
                  }
                />
              </div>

              {/* Comment */}
              <div className={styles.formGroup}>
                <label htmlFor="comment" className={styles.label}>
                  {t("fields.comment")}{" "}
                  <span className={styles.required}>*</span>
                </label>

                <textarea
                  id="comment"
                  name="comment"
                  value={values.comment}
                  onChange={(e) => {
                    stopAttemptedSubmit();
                    handleChange(e);
                  }}
                  onBlur={handleBlur}
                  placeholder={t("placeholders.comment")}
                  rows={5}
                  className={styles.textarea}
                  aria-invalid={Boolean(
                    (touched.comment || attemptedSubmit) && errors.comment,
                  )}
                  aria-describedby="comment-error"
                />

                <div id="comment-error">
                  <ErrorSlot
                    error={
                      touched.comment || attemptedSubmit
                        ? (errors.comment as string)
                        : ""
                    }
                  />
                </div>
              </div>

              <div className={styles.buttonGroup}>
                <button
                  type="button"
                  onClick={onCancel}
                  className={styles.cancelButton}
                >
                  {t("buttons.cancel")}
                </button>

                <button
                  type="submit"
                  className={`${styles.submitButton} ${
                    !canSubmit ? styles.submitButtonDisabled : ""
                  }`}
                  disabled={!canSubmit}
                >
                  {t("buttons.submit")}
                </button>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}
