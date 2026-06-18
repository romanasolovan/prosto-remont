"use client";

import { useTranslations } from "next-intl";
import type {
  FormikErrors,
  FormikTouched,
  FormikValues,
  FormikHelpers,
} from "formik";

import type { FormValues } from "../types";
import type { SelectOption } from "../FormSelect";

import FormSelect from "../FormSelect";
import FormDatePicker from "../FormDatePicker";
import FormTextarea from "../FormTextarea";

import layout from "../ContactFormLayout.module.css";
import sections from "./FormSection.module.css";

interface ProjectSectionProps {
  values: FormValues;
  errors: FormikErrors<FormValues>;
  touched: FormikTouched<FormValues>;
  interestedInOptions: SelectOption[];
  renovationTypeOptions: SelectOption[];
  renovationObjectOptions: SelectOption[];
  setFieldValue: FormikHelpers<FormikValues>["setFieldValue"];
  setFieldTouched: FormikHelpers<FormikValues>["setFieldTouched"];
  validateField: (field: string) => Promise<void> | Promise<string | undefined>;
}

export default function ProjectSection({
  values,
  errors,
  touched,
  interestedInOptions,
  renovationTypeOptions,
  renovationObjectOptions,
  setFieldValue,
  setFieldTouched,
  validateField,
}: ProjectSectionProps) {
  const t = useTranslations("form");

  return (
    <div className={sections.formSection}>
      <div className={sections.sectionHeader}>
        <p className={sections.sectionEyebrow}>
          {t("sections.project.eyebrow")}
        </p>
        <h3 className={sections.sectionTitle}>{t("sections.project.title")}</h3>
      </div>

      <div className={layout.projectGrid}>
        <FormSelect
          id="interestedIn"
          name="interestedIn"
          label={t("fields.interestedIn")}
          placeholder={t("placeholders.interestedIn")}
          value={values.interestedIn}
          options={interestedInOptions}
          error={errors.interestedIn}
          touched={touched.interestedIn}
          required
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          validateField={validateField}
        />

        <FormSelect
          id="renovationType"
          name="renovationType"
          label={t("fields.renovationType")}
          placeholder={t("placeholders.renovationType")}
          value={values.renovationType}
          options={renovationTypeOptions}
          error={errors.renovationType}
          touched={touched.renovationType}
          required
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          validateField={validateField}
        />

        <FormSelect
          id="renovationObject"
          name="renovationObject"
          label={t("fields.renovationObject")}
          placeholder={t("placeholders.renovationObject")}
          value={values.renovationObject}
          options={renovationObjectOptions}
          error={errors.renovationObject}
          touched={touched.renovationObject}
          required
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          validateField={validateField}
        />

        <div className={layout.dateColumn}>
          <FormDatePicker
            id="startDate"
            name="startDate"
            label={t("fields.startDate")}
            value={values.startDate}
            required
            hint={t("date.helper")}
            error={errors.startDate as string}
            touched={touched.startDate}
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            validateField={validateField}
          />
        </div>

        <div className={layout.descriptionColumn}>
          <FormTextarea
            id="workDescription"
            name="workDescription"
            label={t("fields.workDescription")}
            placeholder={t("placeholders.workDescription")}
            hint={t("fieldsHint.workDescription")}
            rows={4}
          />
        </div>
      </div>
    </div>
  );
}
