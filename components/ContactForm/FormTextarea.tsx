import { Field } from "formik";
import styles from "./ContactForm.module.css";

interface FormTextareaProps {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  touched?: boolean;
  hint?: string;
  rows?: number;
}

export default function FormTextarea({
  id,
  name,
  label,
  placeholder,
  required,
  error,
  touched,
  hint,
  rows = 5,
}: FormTextareaProps) {
  const visibleError = touched ? error : undefined;
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = visibleError ? `${id}-error` : undefined;

  return (
    <div className={`${styles.formGroup} ${styles.fullWidth}`}>
      <label htmlFor={id} className={styles.label}>
        {label} {required && <span className={styles.required}>*</span>}
      </label>

      <Field
        as="textarea"
        id={id}
        name={name}
        placeholder={placeholder}
        rows={rows}
        className={styles.textarea}
        aria-invalid={Boolean(visibleError)}
        aria-describedby={
          [hintId, errorId].filter(Boolean).join(" ") || undefined
        }
      />

      {hint && (
        <p id={hintId} className={styles.fieldHint}>
          {hint}
        </p>
      )}

      <div className={styles.errorSlot} id={`${id}-error`} aria-live="polite">
        <div
          className={`${styles.error} ${visibleError ? styles.visible : ""}`}
        >
          {visibleError || "\u00A0"}
        </div>
      </div>
    </div>
  );
}
