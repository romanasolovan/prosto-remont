"use client";

import { useTranslations } from "next-intl";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import styles from "./ContactForm.module.css";

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

const MAX_FILE_SIZE = 100 * 1024 * 1024;
const MAX_FILES = 10;
const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const ErrorSlot = ({ error }: { error?: string }) => (
  <div className={styles.errorSlot}>
    <div className={`${styles.error} ${error ? styles.visible : ""}`}>
      {error || "\u00A0"}
    </div>
  </div>
);

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

      const response = await fetch("/api/quote-requests", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit quote request");
      }

      setSubmitStatus("success");
      resetForm();
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: File[]) => void,
    currentFiles: File[],
  ) => {
    const files = Array.from(event.target.files || []);

    if (currentFiles.length + files.length > MAX_FILES) {
      alert(t("validation.tooManyFiles"));
      return;
    }

    const validFiles = files.filter((file) => {
      if (file.size > MAX_FILE_SIZE) {
        alert(`${file.name}: ${t("validation.fileTooLarge")}`);
        return false;
      }
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        alert(`${file.name}: ${t("validation.invalidFileType")}`);
        return false;
      }
      return true;
    });

    setFieldValue("attachments", [...currentFiles, ...validFiles]);
  };

  const removeFile = (
    index: number,
    setFieldValue: (field: string, value: File[]) => void,
    currentFiles: File[],
  ) => {
    const newFiles = currentFiles.filter((_, i) => i !== index);
    setFieldValue("attachments", newFiles);
  };

  return (
    <div className={styles.formShell}>
      {submitStatus === "success" ? (
        <div className={styles.successState} aria-live="polite">
          <div className={styles.successMark} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M20 7L9.5 17.5L4 12"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <p className={styles.successTextSimple}>
            Your request has been received.
          </p>

          <div className={styles.successActions}>
            <button
              type="button"
              onClick={() => setSubmitStatus("idle")}
              className={styles.secondaryButton}
            >
              Send another
            </button>

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className={styles.primaryButton}
              >
                Close
              </button>
            )}
          </div>
        </div>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue, values, errors, touched }) => (
            <Form className={styles.form}>
              <div className={styles.formScrollArea}>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label htmlFor="fullName" className={styles.label}>
                      {t("fields.fullName")}{" "}
                      <span className={styles.required}>*</span>
                    </label>
                    <Field
                      type="text"
                      id="fullName"
                      name="fullName"
                      placeholder={t("placeholders.fullName")}
                      className={styles.input}
                    />
                    <ErrorSlot
                      error={
                        touched.fullName
                          ? (errors.fullName as string)
                          : undefined
                      }
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="phone" className={styles.label}>
                      {t("fields.phone")}{" "}
                      <span className={styles.required}>*</span>
                    </label>
                    <Field
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder={t("placeholders.phone")}
                      className={styles.input}
                    />
                    <ErrorSlot
                      error={
                        touched.phone ? (errors.phone as string) : undefined
                      }
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>
                      {t("fields.email")}{" "}
                      <span className={styles.required}>*</span>
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      placeholder={t("placeholders.email")}
                      className={styles.input}
                    />
                    <ErrorSlot
                      error={
                        touched.email ? (errors.email as string) : undefined
                      }
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="interestedIn" className={styles.label}>
                      {t("fields.interestedIn")}{" "}
                      <span className={styles.required}>*</span>
                    </label>
                    <div className={styles.selectShell}>
                      <Field
                        as="select"
                        id="interestedIn"
                        name="interestedIn"
                        className={styles.select}
                      >
                        <option value="">
                          {t("placeholders.interestedIn")}
                        </option>
                        <option value="newConstruction">
                          {t("options.interestedIn.newConstruction")}
                        </option>
                        <option value="renovation">
                          {t("options.interestedIn.renovation")}
                        </option>
                      </Field>
                    </div>
                    <ErrorSlot
                      error={
                        touched.interestedIn
                          ? (errors.interestedIn as string)
                          : undefined
                      }
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="renovationType" className={styles.label}>
                      {t("fields.renovationType")}{" "}
                      <span className={styles.required}>*</span>
                    </label>
                    <div className={styles.selectShell}>
                      <Field
                        as="select"
                        id="renovationType"
                        name="renovationType"
                        className={styles.select}
                      >
                        <option value="">
                          {t("placeholders.renovationType")}
                        </option>
                        <option value="turnkeyNoProject">
                          {t("options.renovationType.turnkeyNoProject")}
                        </option>
                        <option value="turnkeyWithProject">
                          {t("options.renovationType.turnkeyWithProject")}
                        </option>
                        <option value="refresh">
                          {t("options.renovationType.refresh")}
                        </option>
                        <option value="repairs">
                          {t("options.renovationType.repairs")}
                        </option>
                      </Field>
                    </div>
                    <ErrorSlot
                      error={
                        touched.renovationType
                          ? (errors.renovationType as string)
                          : undefined
                      }
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="renovationObject" className={styles.label}>
                      {t("fields.renovationObject")}{" "}
                      <span className={styles.required}>*</span>
                    </label>
                    <div className={styles.selectShell}>
                      <Field
                        as="select"
                        id="renovationObject"
                        name="renovationObject"
                        className={styles.select}
                      >
                        <option value="">
                          {t("placeholders.renovationObject")}
                        </option>
                        <option value="house">
                          {t("options.renovationObject.house")}
                        </option>
                        <option value="apartment">
                          {t("options.renovationObject.apartment")}
                        </option>
                        <option value="serviceSpace">
                          {t("options.renovationObject.serviceSpace")}
                        </option>
                        <option value="office">
                          {t("options.renovationObject.office")}
                        </option>
                        <option value="bathroom">
                          {t("options.renovationObject.bathroom")}
                        </option>
                        <option value="room">
                          {t("options.renovationObject.room")}
                        </option>
                      </Field>
                    </div>
                    <ErrorSlot
                      error={
                        touched.renovationObject
                          ? (errors.renovationObject as string)
                          : undefined
                      }
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="startDate" className={styles.label}>
                      {t("fields.startDate")}{" "}
                      <span className={styles.required}>*</span>
                    </label>
                    <div className={styles.dateShell}>
                      <Field
                        type="date"
                        id="startDate"
                        name="startDate"
                        className={styles.input}
                      />
                    </div>
                    <ErrorSlot
                      error={
                        touched.startDate
                          ? (errors.startDate as string)
                          : undefined
                      }
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="location" className={styles.label}>
                      {t("fields.location")}{" "}
                      <span className={styles.required}>*</span>
                    </label>
                    <Field
                      type="text"
                      id="location"
                      name="location"
                      placeholder={t("placeholders.location")}
                      className={styles.input}
                    />
                    <ErrorSlot
                      error={
                        touched.location
                          ? (errors.location as string)
                          : undefined
                      }
                    />
                  </div>

                  <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label htmlFor="workDescription" className={styles.label}>
                      {t("fields.workDescription")}
                    </label>
                    <Field
                      type="text"
                      id="workDescription"
                      name="workDescription"
                      placeholder={t("placeholders.workDescription")}
                      className={styles.input}
                    />
                    <ErrorSlot
                      error={
                        touched.workDescription
                          ? (errors.workDescription as string)
                          : undefined
                      }
                    />
                  </div>

                  <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label htmlFor="attachments" className={styles.label}>
                      {t("fields.attachments")}
                    </label>

                    <div className={styles.fileUploadArea}>
                      <input
                        type="file"
                        id="attachments"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png,.docx"
                        onChange={(e) =>
                          handleFileChange(e, setFieldValue, values.attachments)
                        }
                        className={styles.fileInput}
                      />
                      <label htmlFor="attachments" className={styles.fileLabel}>
                        <svg
                          className={styles.uploadIcon}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.8}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <span>{t("fileUpload.dragDrop")}</span>
                      </label>
                    </div>

                    <p className={styles.fileHint}>
                      {t("fileUpload.supportedFormats")}
                    </p>

                    {values.attachments.length > 0 && (
                      <div className={styles.fileList}>
                        <p className={styles.fileListTitle}>
                          {t("fileUpload.selectedFiles")}:
                        </p>

                        {values.attachments.map((file, index) => (
                          <div key={index} className={styles.fileItem}>
                            <span className={styles.fileName}>{file.name}</span>
                            <span className={styles.fileSize}>
                              ({(file.size / 1024 / 1024).toFixed(2)} MB)
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                removeFile(
                                  index,
                                  setFieldValue,
                                  values.attachments,
                                )
                              }
                              className={styles.removeFileButton}
                            >
                              {t("fileUpload.removeFile")}
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label
                      htmlFor="additionalComments"
                      className={styles.label}
                    >
                      {t("fields.additionalComments")}
                    </label>
                    <Field
                      as="textarea"
                      id="additionalComments"
                      name="additionalComments"
                      placeholder={t("placeholders.additionalComments")}
                      rows={5}
                      className={styles.textarea}
                    />
                    <ErrorSlot
                      error={
                        touched.additionalComments
                          ? (errors.additionalComments as string)
                          : undefined
                      }
                    />
                  </div>
                </div>
              </div>

              {submitStatus === "error" && (
                <div className={styles.errorMessage}>{t("errorMessage")}</div>
              )}

              <div className={styles.formFooter}>
                {onClose && (
                  <button
                    type="button"
                    onClick={onClose}
                    className={styles.secondaryButton}
                  >
                    Close
                  </button>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={styles.primaryButton}
                >
                  {isSubmitting ? t("submitting") : t("submit")}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}
