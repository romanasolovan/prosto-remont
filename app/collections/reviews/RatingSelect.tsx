"use client";

import { useField } from "@payloadcms/ui";
import type { NumberFieldClientComponent } from "payload";

const ratingOptions = [1, 2, 3, 4, 5];

export const RatingSelect: NumberFieldClientComponent = ({
  field,
  path,
  readOnly,
}) => {
  const { value, setValue, showError, errorMessage } =
    useField<number>({ path });

  const fieldId = `field-${path}`;

  return (
    <div
      className={`field-type ${showError ? "error" : ""}`}
    >
      <label
        htmlFor={fieldId}
        className="field-label"
      >
        {typeof field.label === "string"
          ? field.label
          : "Rating"}

        {field.required && (
          <span className="required">*</span>
        )}
      </label>

      <select
        id={fieldId}
        value={value ?? ""}
        disabled={readOnly}
        required={field.required}
        aria-invalid={showError}
        aria-describedby={
          showError ? `${fieldId}-error` : undefined
        }
        onChange={(event) => {
          setValue(Number(event.target.value));
        }}
        style={{
          width: "100%",
          minHeight: "40px",
          padding: "10px 12px",
          border: "1px solid var(--theme-elevation-150)",
          borderRadius: "4px",
          background: "var(--theme-input-bg)",
          color: "var(--theme-text)",
          fontSize: "inherit",
        }}
      >
        <option value="" disabled>
          Select a rating
        </option>

        {ratingOptions.map((rating) => (
          <option key={rating} value={rating}>
            {rating} — {"★".repeat(rating)}
          </option>
        ))}
      </select>

      {showError && errorMessage && (
        <div
          id={`${fieldId}-error`}
          role="alert"
          style={{
            color: "var(--theme-error-500)",
            marginTop: "6px",
          }}
        >
          {errorMessage}
        </div>
      )}
    </div>
  );
};