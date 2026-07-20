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
    location: string;
    photo: File | null;
  }) => void | Promise<void>;
  onCancel: () => void;
}

type FormValues = {
  name: string;
  rating: number;
  comment: string;
  location: string;
  photo: File | null;
};

const NAME_MIN = 2;
const NAME_MAX = 50;
const COMMENT_MIN = 10;
const COMMENT_MAX = 500;

const ACCEPTED_PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_PHOTO_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

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

  const [photoError, setPhotoError] = useState<string | null>(null);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string | null>(null);
  const [isDraggingPhoto, setIsDraggingPhoto] = useState(false);

  const firstInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const shakeTimeoutRef = useRef<number | null>(null);

  const initialValues: FormValues = {
    name: "",
    rating: 0,
    comment: "",
    location: "",
    photo: null,
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

  useEffect(() => {
    return () => {
      if (photoPreviewUrl) {
        URL.revokeObjectURL(photoPreviewUrl);
      }
    };
  }, [photoPreviewUrl]);

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
        location: Yup.string()
          .transform((value) =>
            typeof value === "string" ? value.trim() : value,
          )
          .required(t("validation.requiredLocation")),
      }),
    [t],
  );

  const formatMaxSize = () =>
    `${Math.round(MAX_PHOTO_SIZE_BYTES / (1024 * 1024))}MB`;

  const applyPhotoFile = (
    file: File | null,
    setFieldValue: (field: string, value: unknown) => void,
  ) => {
    if (!file) {
      setFieldValue("photo", null);
      setPhotoPreviewUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return null;
      });
      setPhotoError(null);
      return;
    }

    if (!ACCEPTED_PHOTO_TYPES.includes(file.type)) {
      setPhotoError(t("validation.photoInvalidType"));
      return;
    }

    if (file.size > MAX_PHOTO_SIZE_BYTES) {
      setPhotoError(t("validation.photoTooLarge", { size: formatMaxSize() }));
      return;
    }

    setPhotoError(null);
    setFieldValue("photo", file);
    setPhotoPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
  };

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
              {isSuccessVisible ? t("success.title") : t("title")}
            </h3>
            <p id="leave-review-description" className={styles.formDescription}>
              {isSuccessVisible
                ? t("success.reviewSubmitted")
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

            <h4 className={styles.successTitle}>{t("success.title")}</h4>

            <p className={styles.successText}>{t("success.reviewSubmitted")}</p>

            <button
              type="button"
              onClick={onCancel}
              className={styles.successCloseButton}
            >
              {t("buttons.close")}
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
                location: values.location.trim(),
                photo: values.photo,
              });

              helpers.resetForm();
              helpers.setSubmitting(false);
              setAttemptedSubmit(false);
              setHoveredRating(0);
              setPhotoError(null);
              setPhotoPreviewUrl((prev) => {
                if (prev) URL.revokeObjectURL(prev);
                return null;
              });
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
                    <label htmlFor="location" className={styles.label}>
                      {t("fields.location")}{" "}
                      <span className={styles.required}>*</span>
                    </label>

                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={values.location}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder={t("placeholders.location")}
                      className={styles.input}
                      autoComplete="address-level2"
                      aria-invalid={Boolean(
                        (touched.location || attemptedSubmit) &&
                        errors.location,
                      )}
                      aria-describedby="location-error"
                    />

                    <ErrorSlot
                      id="location-error"
                      error={
                        touched.location || attemptedSubmit
                          ? (errors.location as string)
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
                      className={styles.ratingRow}
                      role="radiogroup"
                      aria-label={t("fields.rating")}
                    >
                      {[1, 2, 3, 4, 5].map((star) => {
                        const isActive =
                          star <= (hoveredRating || values.rating);

                        return (
                          <button
                            key={star}
                            type="button"
                            className={`${styles.starButton} ${
                              isActive ? styles.starButtonActive : ""
                            }`}
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                            onClick={() => {
                              setFieldValue("rating", star);
                              setFieldTouched("rating", true, false);
                            }}
                            aria-label={t("aria.selectRating", {
                              rating: star,
                            })}
                            aria-checked={values.rating === star}
                            role="radio"
                          >
                            <svg
                              viewBox="0 0 20 20"
                              fill="currentColor"
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
                        touched.rating || attemptedSubmit
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
                      className={styles.textarea}
                      rows={6}
                      maxLength={COMMENT_MAX}
                      aria-invalid={Boolean(
                        (touched.comment || attemptedSubmit) && errors.comment,
                      )}
                      aria-describedby="comment-error"
                    />

                    <div className={styles.metaRow}>
                      <ErrorSlot
                        id="comment-error"
                        error={
                          touched.comment || attemptedSubmit
                            ? (errors.comment as string)
                            : ""
                        }
                      />

                      <span className={styles.charCount}>
                        {commentLength}/{COMMENT_MAX}
                      </span>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <span className={styles.label}>
                      {t("fields.photo")}{" "}
                      <span className={styles.optional}>
                        {t("fields.optional")}
                      </span>
                    </span>

                    <div className={styles.fileUploadShell}>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept={ACCEPTED_PHOTO_TYPES.join(",")}
                        className={styles.fileInput}
                        onChange={(event) => {
                          const file = event.currentTarget.files?.[0] ?? null;
                          applyPhotoFile(file, setFieldValue);
                          event.currentTarget.value = "";
                        }}
                        aria-describedby="photo-hint photo-error"
                      />

                      {!values.photo && (
                        <button
                          type="button"
                          className={`${styles.fileUploadLabel} ${
                            isDraggingPhoto ? styles.fileUploadLabelActive : ""
                          }`}
                          onClick={() => fileInputRef.current?.click()}
                          onDragOver={(event) => {
                            event.preventDefault();
                            setIsDraggingPhoto(true);
                          }}
                          onDragLeave={() => setIsDraggingPhoto(false)}
                          onDrop={(event) => {
                            event.preventDefault();
                            setIsDraggingPhoto(false);
                            const file = event.dataTransfer.files?.[0] ?? null;
                            applyPhotoFile(file, setFieldValue);
                          }}
                        >
                          <span
                            className={styles.uploadIcon}
                            aria-hidden="true"
                          >
                            +
                          </span>
                          <span>{t("placeholders.addPhoto")}</span>
                        </button>
                      )}

                      <span id="photo-hint" className={styles.uploadHint}>
                        {t("placeholders.photoHint", {
                          size: formatMaxSize(),
                        })}
                      </span>

                      {values.photo && photoPreviewUrl && (
                        <div className={styles.selectedFile}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={photoPreviewUrl}
                            alt=""
                            className={styles.photoThumb}
                          />

                          <span className={styles.selectedFileName}>
                            {values.photo.name}
                          </span>

                          <button
                            type="button"
                            className={styles.removeFileButton}
                            onClick={() => applyPhotoFile(null, setFieldValue)}
                            aria-label={t("aria.removePhoto")}
                          >
                            {t("buttons.remove")}
                          </button>
                        </div>
                      )}

                      <div id="photo-error" aria-live="polite">
                        {photoError && (
                          <p className={`${styles.error} ${styles.visible}`}>
                            {photoError}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className={styles.formActions}>
                    <button
                      type="button"
                      onClick={onCancel}
                      className={styles.cancelButton}
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
