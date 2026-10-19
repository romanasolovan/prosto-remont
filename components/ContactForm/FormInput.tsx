
import { Field, useField, useFormikContext } from "formik";
import styles from "./Fields/FormFields.module.css";

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
  autoComplete?: string;
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
  autoComplete,
}: FormInputProps) {
  const [field] = useField<string>(name);
  const { submitCount } = useFormikContext();

  const hasValue = field.value.trim().length > 0;
  const showError = Boolean(
    error && (submitCount > 0 || (touched && hasValue)),
  );

  const visibleError = showError ? error : undefined;
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = visibleError ? `${id}-error` : undefined;

  return (
    <div className={styles.formGroup}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && (
          <span className={styles.required} aria-hidden="true">
            *
          </span>
        )}
      </label>

      <Field
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        className={styles.input}
        autoComplete={autoComplete}
        aria-required={required || undefined}
        aria-invalid={showError}
        aria-describedby={
          [hintId, errorId].filter(Boolean).join(" ") || undefined
        }
      />

      {hint && (
        <p id={hintId} className={styles.fieldHint}>
          {hint}
        </p>
      )}

      <div className={styles.errorSlot} aria-live="polite">
        <p
          id={`${id}-error`}
          className={`${styles.error} ${
            showError ? styles.visible : ""
          }`}
        >
          {visibleError || "\u00A0"}
        </p>
      </div>
    </div>
  );
}