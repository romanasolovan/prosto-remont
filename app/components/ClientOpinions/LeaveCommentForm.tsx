"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import styles from "./LeaveCommentForm.module.css";

interface LeaveCommentFormProps {
  onSubmit: (data: { name: string; rating: number; comment: string }) => void;
  onCancel: () => void;
}

export default function LeaveCommentForm({
  onSubmit,
  onCancel,
}: LeaveCommentFormProps) {
  const t = useTranslations("leaveComment");

  const [formData, setFormData] = useState({
    name: "",
    rating: 0,
    comment: "",
  });

  const [hoveredRating, setHoveredRating] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = t("validation.requiredName");
    }
    if (formData.rating === 0) {
      newErrors.rating = t("validation.requiredRating");
    }
    if (!formData.comment.trim()) {
      newErrors.comment = t("validation.requiredComment");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      onSubmit(formData);
      setFormData({ name: "", rating: 0, comment: "" });
      setErrors({});
    }
  };

  return (
    <div className={styles.formContainer}>
      <h3 className={styles.formTitle}>{t("title")}</h3>
      <p className={styles.formDescription}>{t("description")}</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Name */}
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            {t("fields.name")} <span className={styles.required}>*</span>
          </label>

          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder={t("placeholders.name")}
            className={styles.input}
          />

          {/* Stable error slot */}
          <div className={styles.errorSlot}>
            <div
              className={`${styles.error} ${errors.name ? styles.visible : ""}`}
            >
              {errors.name || "\u00A0"}
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className={styles.formGroup}>
          <label className={styles.label}>
            {t("fields.rating")} <span className={styles.required}>*</span>
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
                onClick={() => setFormData({ ...formData, rating: star })}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className={styles.starButton}
                aria-label={t("aria.selectRating", { rating: star })}
              >
                <svg
                  className={
                    star <= (hoveredRating || formData.rating)
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

          <div className={styles.errorSlot}>
            <div
              className={`${styles.error} ${errors.rating ? styles.visible : ""}`}
            >
              {errors.rating || "\u00A0"}
            </div>
          </div>
        </div>

        {/* Comment */}
        <div className={styles.formGroup}>
          <label htmlFor="comment" className={styles.label}>
            {t("fields.comment")} <span className={styles.required}>*</span>
          </label>

          <textarea
            id="comment"
            value={formData.comment}
            onChange={(e) =>
              setFormData({ ...formData, comment: e.target.value })
            }
            placeholder={t("placeholders.comment")}
            rows={5}
            className={styles.textarea}
          />

          <div className={styles.errorSlot}>
            <div
              className={`${styles.error} ${errors.comment ? styles.visible : ""}`}
            >
              {errors.comment || "\u00A0"}
            </div>
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
          <button type="submit" className={styles.submitButton}>
            {t("buttons.submit")}
          </button>
        </div>
      </form>
    </div>
  );
}
