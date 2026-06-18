import { Field } from "formik";
import fields from "./Fields/FormFields.module.css";
import styles from "./Fields/FormTextarea.module.css";

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
    <div className={`${fields.formGroup} ${fields.fullWidth}`}>
      <label htmlFor={id} className={fields.label}>
        {label} {required && <span className={fields.required}>*</span>}
      </label>

      <Field
        as="textarea"
        id={id}
        name={name}
        placeholder={placeholder}
        rows={rows}
        className={styles.textarea}
        aria-required={required}
        aria-invalid={Boolean(visibleError)}
        aria-describedby={
          [hintId, errorId].filter(Boolean).join(" ") || undefined
        }
      />

      {hint && (
        <p id={hintId} className={fields.fieldHint}>
          {hint}
        </p>
      )}

      <div className={fields.errorSlot} id={`${id}-error`} aria-live="polite">
        <div
          className={`${fields.error} ${visibleError ? fields.visible : ""}`}
        >
          {visibleError || "\u00A0"}
        </div>
      </div>
    </div>
  );
}
