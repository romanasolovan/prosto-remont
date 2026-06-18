"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Formik, Form, FormikHelpers } from "formik";

import styles from "./ContactForm.module.css";
import layout from "./ContactFormLayout.module.css";

import buttons from "./Buttons/Buttons.module.css";

import type { FormValues } from "./types";
import { initialContactFormValues } from "./constants/initialValues";
import { createContactFormSchema } from "./validation/contactFormSchema";
import { submitQuoteRequest } from "./services/submitQuoteRequest";

import {
  interestedInOptionKeys,
  renovationObjectOptionKeys,
  renovationTypeOptionKeys,
} from "./constants/formOptions";

import SuccessState from "./SuccessState";
import SubmitButton from "./SubmitButton";
import SubmitError from "./SubmitError";
import ContactSection from "./Sections/ContactSection";
import ProjectsSection from "./Sections/ProjectsSection";
import DetailsSection from "./Sections/DetailsSection";
import { SelectOption } from "./FormSelect";

interface ContactFormProps {
  onClose?: () => void;
}

export default function ContactForm({ onClose }: ContactFormProps) {
  const t = useTranslations("form");
  const validationSchema = createContactFormSchema(t);

  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const interestedInOptions: SelectOption[] = interestedInOptionKeys.map(
    (option) => ({
      value: option.value,
      label: t(option.labelKey),
    }),
  );

  const renovationTypeOptions: SelectOption[] = renovationTypeOptionKeys.map(
    (option) => ({
      value: option.value,
      label: t(option.labelKey),
    }),
  );

  const renovationObjectOptions: SelectOption[] =
    renovationObjectOptionKeys.map((option) => ({
      value: option.value,
      label: t(option.labelKey),
    }));

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>,
  ) => {
    try {
      await submitQuoteRequest(values);

      setSubmitStatus("success");
      resetForm();
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.formShell}>
      {submitStatus === "success" ? (
        <SuccessState
          onSendAnother={() => setSubmitStatus("idle")}
          onClose={onClose}
        />
      ) : (
        <Formik
          initialValues={initialContactFormValues}
          validationSchema={validationSchema}
          validateOnBlur
          validateOnChange
          onSubmit={handleSubmit}
        >
          {({
            isSubmitting,
            setFieldValue,
            setFieldTouched,
            validateField,
            values,
            errors,
            touched,
          }) => (
            <Form className={layout.form} noValidate>
              <div className={layout.formScrollArea}>
                <ContactSection errors={errors} touched={touched} />

                <ProjectsSection
                  values={values}
                  errors={errors}
                  touched={touched}
                  interestedInOptions={interestedInOptions}
                  renovationTypeOptions={renovationTypeOptions}
                  renovationObjectOptions={renovationObjectOptions}
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  validateField={validateField}
                />

                <DetailsSection
                  files={values.attachments}
                  setFieldValue={setFieldValue}
                />
              </div>

              {submitStatus === "error" && <SubmitError />}

              <div className={styles.formFooter}>
                {onClose && (
                  <button
                    type="button"
                    onClick={onClose}
                    className={buttons.secondaryButton}
                  >
                    {t("actions.close")}
                  </button>
                )}

                <SubmitButton isSubmitting={isSubmitting} />
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}
