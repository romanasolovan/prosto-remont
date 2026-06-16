import { Field } from "formik";
import styles from "./ContactForm.module.css";

interface FormInputProps {
  id: string;
  name: string;
  type?: "text" | "email" | "tel" | "date";
  label: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  touched?: boolean;
  hint?: string;
}

export default function FormInput({
  id,
  name,
  type = "text",
  label,
  placeholder,
  required,
  error,
  touched,
  hint,
}: FormInputProps) {
  const visibleError = touched ? error : undefined;
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = visibleError ? `${id}-error` : undefined;

  return (
    <div className={styles.formGroup}>
      <label htmlFor={id} className={styles.label}>
        {label} {required && <span className={styles.required}>*</span>}
      </label>

      <Field
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        className={styles.input}
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
