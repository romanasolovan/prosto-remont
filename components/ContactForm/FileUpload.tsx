"use client";

import { ChangeEvent, DragEvent, useState } from "react";
import { useTranslations } from "next-intl";
import styles from "./ContactForm.module.css";

interface FileUploadProps {
  files: File[];
  setFieldValue: (field: string, value: File[]) => void;
}

const MAX_FILE_SIZE = 100 * 1024 * 1024;
const MAX_FILES = 10;

const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export default function FileUpload({ files, setFieldValue }: FileUploadProps) {
  const t = useTranslations("form");
  const [fileError, setFileError] = useState("");
  const [isDraggingFiles, setIsDraggingFiles] = useState(false);

  const addFiles = (incomingFiles: File[]) => {
    setFileError("");

    if (files.length + incomingFiles.length > MAX_FILES) {
      setFileError(t("validation.tooManyFiles"));
      return;
    }

    const validFiles = incomingFiles.filter((file) => {
      if (file.size > MAX_FILE_SIZE) {
        setFileError(`${file.name}: ${t("validation.fileTooLarge")}`);
        return false;
      }

      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        setFileError(`${file.name}: ${t("validation.invalidFileType")}`);
        return false;
      }

      return true;
    });

    if (validFiles.length > 0) {
      setFieldValue("attachments", [...files, ...validFiles]);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);

    addFiles(selectedFiles);
    event.target.value = "";
  };

  const handleFileDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDraggingFiles(false);

    const droppedFiles = Array.from(event.dataTransfer.files || []);
    addFiles(droppedFiles);
  };

  const removeFile = (index: number) => {
    setFieldValue(
      "attachments",
      files.filter((_, fileIndex) => fileIndex !== index),
    );
  };

  return (
    <div className={`${styles.formGroup} ${styles.fullWidth}`}>
      <label htmlFor="attachments" className={styles.label}>
        {t("fields.attachments")}
      </label>

      <div className={styles.fileUploadArea}>
        <input
          type="file"
          name="attachments"
          id="attachments"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.docx"
          onChange={handleFileChange}
          className={styles.fileInput}
          aria-describedby={fileError ? "attachments-error" : undefined}
        />

        <label
          htmlFor="attachments"
          className={`${styles.fileLabel} ${
            isDraggingFiles ? styles.isDraggingFiles : ""
          }`}
          onDragEnter={(event) => {
            event.preventDefault();
            setIsDraggingFiles(true);
          }}
          onDragOver={(event) => {
            event.preventDefault();
            setIsDraggingFiles(true);
          }}
          onDragLeave={(event) => {
            event.preventDefault();
            setIsDraggingFiles(false);
          }}
          onDrop={handleFileDrop}
        >
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
          <small>{t("fileUpload.supportedFormats")}</small>
        </label>
      </div>

      {fileError && (
        <p
          id="attachments-error"
          className={styles.fileError}
          aria-live="polite"
        >
          {fileError}
        </p>
      )}

      {files.length > 0 && (
        <div className={styles.fileList}>
          <p className={styles.fileListTitle}>
            {t("fileUpload.selectedFiles")}:
          </p>

          {files.map((file, index) => (
            <div key={`${file.name}-${index}`} className={styles.fileItem}>
              <span className={styles.fileName}>{file.name}</span>

              <span className={styles.fileSize}>
                {(file.size / 1024 / 1024).toFixed(2)}{" "}
                {t("fileUpload.sizeUnit")}
              </span>

              <button
                type="button"
                onClick={() => removeFile(index)}
                className={styles.removeFileButton}
              >
                {t("fileUpload.removeFile")}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
