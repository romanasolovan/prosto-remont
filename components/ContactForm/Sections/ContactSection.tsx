import { useTranslations } from "next-intl";
import type { FormikErrors, FormikTouched } from "formik";

import type { FormValues } from "../types";
import FormInput from "../FormInput";

import layout from "../ContactFormLayout.module.css";
import sections from "./FormSection.module.css";

interface ContactSectionProps {
  errors: FormikErrors<FormValues>;
  touched: FormikTouched<FormValues>;
}

export default function ContactSection({
  errors,
  touched,
}: ContactSectionProps) {
  const t = useTranslations("form");

  return (
    <div className={sections.formSection}>
      <div className={sections.sectionHeader}>
        <p className={sections.sectionEyebrow}>
          {t("sections.contact.eyebrow")}
        </p>
        <h3 className={sections.sectionTitle}>{t("sections.contact.title")}</h3>
      </div>

      <div className={layout.formGrid}>
        <FormInput
          id="fullName"
          name="fullName"
          label={t("fields.fullName")}
          placeholder={t("placeholders.fullName")}
          required
          touched={touched.fullName}
          error={errors.fullName as string}
          autoComplete="name"
        />

        <FormInput
          id="phone"
          name="phone"
          label={t("fields.phone")}
          placeholder={t("placeholders.phone")}
          type="tel"
          required
          touched={touched.phone}
          error={errors.phone as string}
          autoComplete="tel"
        />

        <FormInput
          id="email"
          name="email"
          label={t("fields.email")}
          placeholder={t("placeholders.email")}
          type="email"
          required
          touched={touched.email}
          error={errors.email as string}
          autoComplete="email"
        />

        <FormInput
          id="location"
          name="location"
          label={t("fields.location")}
          placeholder={t("placeholders.location")}
          required
          touched={touched.location}
          error={errors.location as string}
          autoComplete="address-level2"
        />
      </div>
    </div>
  );
}
