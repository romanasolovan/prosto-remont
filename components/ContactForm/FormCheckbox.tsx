"use client";

import { useField, useFormikContext } from "formik";
import { useTranslations } from "next-intl";

import styles from "./Fields/FormCheckbox.module.css";

export default function FormCheckbox() {
  const t = useTranslations("form");
  const [field, meta] = useField<boolean>("privacyAcknowledged");
  const { submitCount } = useFormikContext();

  const visibleError =
    submitCount > 0 && meta.error ? meta.error : undefined;

  return (
    <div className={styles.checkboxGroup}>
      <div className={styles.checkboxRow}>
        <input
  id="privacyAcknowledged"
  name={field.name}
  type="checkbox"
  checked={field.value}
  onChange={field.onChange}
  onBlur={field.onBlur}
  className={styles.checkbox}
  aria-invalid={Boolean(visibleError)}
  aria-describedby={
    visibleError ? "privacyAcknowledged-error" : undefined
  }
/>

        <label
          htmlFor="privacyAcknowledged"
          className={styles.checkboxLabel}
        >
          {t("privacy.acknowledgment")}
        </label>
      </div>

      <a
        href="https://uodo.gov.pl/"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.privacyLink}
      >
        {t("privacy.learnMore")}
        <span aria-hidden="true"> ↗</span>
      </a>

     <div className={styles.errorSlot}>
  <p
    id="privacyAcknowledged-error"
    className={`${styles.error} ${visibleError ? styles.visible : ""}`}
    aria-live="polite"
  >
    {visibleError || "\u00A0"}
  </p>
</div>
    </div>
  );
}