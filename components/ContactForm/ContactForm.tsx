"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Formik, Form, FormikHelpers, FormikErrors } from "formik";
import * as Yup from "yup";
import styles from "./ContactForm.module.css";

import FormInput from "./FormInput";
import FormTextarea from "./FormTextarea";
import FormSelect, { SelectOption } from "./FormSelect";
import FileUpload from "./FileUpload";
import FormDatePicker from "./FormDatePicker";
import SuccessState from "./SuccessState";
import SubmitButton from "./SubmitButton";

interface FormValues {
  fullName: string;
  phone: string;
  email: string;
  interestedIn: string;
  renovationType: string;
  renovationObject: string;
  workDescription: string;
  attachments: File[];
  startDate: string;
  location: string;
  additionalComments: string;
}

interface ContactFormProps {
  onClose?: () => void;
}

export default function ContactForm({ onClose }: ContactFormProps) {
  const t = useTranslations("form");
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const validationSchema = Yup.object({
    fullName: Yup.string().required(t("validation.required")),
    phone: Yup.string()
      .required(t("validation.required"))
      .matches(
        /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
        t("validation.phoneInvalid"),
      ),
    email: Yup.string()
      .email(t("validation.emailInvalid"))
      .required(t("validation.required")),
    interestedIn: Yup.string().required(t("validation.required")),
    renovationType: Yup.string().required(t("validation.required")),
    renovationObject: Yup.string().required(t("validation.required")),
    workDescription: Yup.string(),
    startDate: Yup.date()
      .required(t("validation.required"))
      .typeError(t("validation.dateInvalid")),
    location: Yup.string().required(t("validation.required")),
    additionalComments: Yup.string(),
  });

  const initialValues: FormValues = {
    fullName: "",
    phone: "",
    email: "",
    interestedIn: "",
    renovationType: "",
    renovationObject: "",
    workDescription: "",
    attachments: [],
    startDate: "",
    location: "",
    additionalComments: "",
  };

  const interestedInOptions: SelectOption[] = [
    {
      value: "newConstruction",
      label: t("options.interestedIn.newConstruction"),
    },
    {
      value: "renovation",
      label: t("options.interestedIn.renovation"),
    },
  ];

  const renovationTypeOptions: SelectOption[] = [
    {
      value: "turnkeyNoProject",
      label: t("options.renovationType.turnkeyNoProject"),
    },
    {
      value: "turnkeyWithProject",
      label: t("options.renovationType.turnkeyWithProject"),
    },
    { value: "refresh", label: t("options.renovationType.refresh") },
    { value: "repairs", label: t("options.renovationType.repairs") },
  ];

  const renovationObjectOptions: SelectOption[] = [
    { value: "house", label: t("options.renovationObject.house") },
    { value: "apartment", label: t("options.renovationObject.apartment") },
    {
      value: "serviceSpace",
      label: t("options.renovationObject.serviceSpace"),
    },
    { value: "office", label: t("options.renovationObject.office") },
    { value: "bathroom", label: t("options.renovationObject.bathroom") },
    { value: "room", label: t("options.renovationObject.room") },
  ];

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>,
  ) => {
    try {
      const formData = new FormData();

      formData.append("fullName", values.fullName);
      formData.append("phone", values.phone);
      formData.append("email", values.email);
      formData.append("interestedIn", values.interestedIn);
      formData.append("renovationType", values.renovationType);
      formData.append("renovationObject", values.renovationObject);
      formData.append("workDescription", values.workDescription);
      formData.append("startDate", values.startDate);
      formData.append("location", values.location);
      formData.append("additionalComments", values.additionalComments);

      values.attachments.forEach((file) => {
        formData.append("attachments", file);
      });

      const response = await fetch("/api/request-quote", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to submit quote request");

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
          initialValues={initialValues}
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
            <Form className={styles.form} noValidate>
              <div className={styles.formScrollArea}>
                <div className={styles.formSection}>
                  <div className={styles.sectionHeader}>
                    <p className={styles.sectionEyebrow}>
                      {t("sections.contact.eyebrow")}
                    </p>
                    <h3 className={styles.sectionTitle}>
                      {t("sections.contact.title")}
                    </h3>
                  </div>

                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <FormInput
                        id="fullName"
                        name="fullName"
                        label={t("fields.fullName")}
                        placeholder={t("placeholders.fullName")}
                        required
                        touched={touched.fullName}
                        error={errors.fullName as string}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <FormInput
                        id="phone"
                        name="phone"
                        label={t("fields.phone")}
                        placeholder={t("placeholders.phone")}
                        type="tel"
                        required
                        touched={touched.phone}
                        error={errors.phone as string}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <FormInput
                        id="email"
                        name="email"
                        label={t("fields.email")}
                        placeholder={t("placeholders.email")}
                        type="email"
                        required
                        touched={touched.email}
                        error={errors.email as string}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <FormInput
                        id="location"
                        name="location"
                        label={t("fields.location")}
                        placeholder={t("placeholders.location")}
                        required
                        touched={touched.location}
                        error={errors.location as string}
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.formSection}>
                  <div className={styles.sectionHeader}>
                    <p className={styles.sectionEyebrow}>
                      {t("sections.project.eyebrow")}
                    </p>
                    <h3 className={styles.sectionTitle}>
                      {t("sections.project.title")}
                    </h3>
                  </div>

                  <div className={styles.formGrid}>
                    <FormSelect
                      id="interestedIn"
                      name="interestedIn"
                      label={t("fields.interestedIn")}
                      placeholder={t("placeholders.interestedIn")}
                      value={values.interestedIn}
                      options={interestedInOptions}
                      error={(errors as FormikErrors<FormValues>).interestedIn}
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
                      error={
                        (errors as FormikErrors<FormValues>).renovationType
                      }
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
                      error={
                        (errors as FormikErrors<FormValues>).renovationObject
                      }
                      touched={touched.renovationObject}
                      required
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                      validateField={validateField}
                    />

                    <div className={styles.formGroup}>
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

                    <div className={`${styles.formGroup} ${styles.fullWidth}`}>
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

                <div className={styles.formSection}>
                  <div className={styles.sectionHeader}>
                    <p className={styles.sectionEyebrow}>
                      {t("sections.details.eyebrow")}
                    </p>
                    <h3 className={styles.sectionTitle}>
                      {t("sections.details.title")}
                    </h3>
                  </div>

                  <div className={styles.formGrid}>
                    <FileUpload
                      files={values.attachments}
                      setFieldValue={setFieldValue}
                    />

                    <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                      <FormTextarea
                        id="additionalComments"
                        name="additionalComments"
                        label={t("fields.additionalComments")}
                        placeholder={t("placeholders.additionalComments")}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {submitStatus === "error" && (
                <div className={styles.errorMessage} aria-live="polite">
                  {t("errorMessage")}
                </div>
              )}

              <div className={styles.formFooter}>
                {onClose && (
                  <button
                    type="button"
                    onClick={onClose}
                    className={styles.secondaryButton}
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
