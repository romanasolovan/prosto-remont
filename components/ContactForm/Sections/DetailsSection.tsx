"use client";

import { useTranslations } from "next-intl";
import type { FormikHelpers, FormikValues } from "formik";

import type { FormValues } from "../types";

import FileUpload from "../FileUpload";
import FormTextarea from "../FormTextarea";

import layout from "../ContactFormLayout.module.css";
import sections from "./FormSection.module.css";

interface DetailsSectionProps {
  files: File[];
  setFieldValue: FormikHelpers<FormikValues>["setFieldValue"];
}

export default function DetailsSection({
  files,
  setFieldValue,
}: DetailsSectionProps) {
  const t = useTranslations("form");

  return (
    <div className={sections.formSection}>
      <div className={sections.sectionHeader}>
        <p className={sections.sectionEyebrow}>
          {t("sections.details.eyebrow")}
        </p>
        <h3 className={sections.sectionTitle}>{t("sections.details.title")}</h3>
      </div>

      <div className={layout.formGrid}>
        <FileUpload files={files} setFieldValue={setFieldValue} />

        <FormTextarea
          id="additionalComments"
          name="additionalComments"
          label={t("fields.additionalComments")}
          placeholder={t("placeholders.additionalComments")}
        />
      </div>
    </div>
  );
}
