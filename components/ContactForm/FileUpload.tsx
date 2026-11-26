"use client";

import {
  type ChangeEvent,
  type DragEvent,
  useState,
} from "react";
import { useTranslations } from "next-intl";

import type { FileUploadProps } from "./types";

import {
  MAX_ATTACHMENTS,
  MAX_TOTAL_ATTACHMENT_SIZE,
  ALLOWED_ATTACHMENT_MIME_TYPES,
  ALLOWED_ATTACHMENT_EXTENSIONS,
} from "./constants/attachmentLimits";

import buttons from "./Buttons/Buttons.module.css";
import fields from "./Fields/FormFields.module.css";
import styles from "./Fields/FileUpload.module.css";

export default function FileUpload({
  files,
  setFieldValue,
}: FileUploadProps) {
  const t = useTranslations("form");

  const [fileError, setFileError] = useState("");
  const [isDraggingFiles, setIsDraggingFiles] =
    useState(false);

  const addFiles = (incomingFiles: File[]) => {
    setFileError("");

    if (incomingFiles.length === 0) return;

    if (
      files.length + incomingFiles.length >
      MAX_ATTACHMENTS
    ) {
      setFileError(t("validation.tooManyFiles"));
      return;
    }

    for (const file of incomingFiles) {
      if (file.size === 0) {
        setFileError(
          `${file.name}: ${t("validation.emptyFile")}`,
        );
        return;
      }

      if (
        !ALLOWED_ATTACHMENT_MIME_TYPES.includes(
          file.type,
        )
      ) {
        setFileError(
          `${file.name}: ${t("validation.invalidFileType")}`,
        );
        return;
      }
    }

    const nextFiles = [...files, ...incomingFiles];

    const totalSize = nextFiles.reduce(
      (total, file) => total + file.size,
      0,
    );

    if (totalSize > MAX_TOTAL_ATTACHMENT_SIZE) {
      setFileError(
        t("validation.totalFilesTooLarge"),
      );
      return;
    }

    setFieldValue("attachments", nextFiles);
  };

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFiles = Array.from(
      event.target.files || [],
    );

    addFiles(selectedFiles);
    event.target.value = "";
  };

  const handleFileDrop = (
    event: DragEvent<HTMLLabelElement>,
  ) => {
    event.preventDefault();
    setIsDraggingFiles(false);

    const droppedFiles = Array.from(
      event.dataTransfer.files || [],
    );

    addFiles(droppedFiles);
  };

  const removeFile = (index: number) => {
    setFileError("");

    setFieldValue(
      "attachments",
      files.filter(
        (_, fileIndex) => fileIndex !== index,
      ),
    );
  };

  return (
    <div className={fields.formGroup}>
      <label
        htmlFor="attachments"
        className={fields.label}
      >
        {t("fields.attachments")}
      </label>

      <div className={styles.fileUploadArea}>
        <input
          type="file"
          name="attachments"
          id="attachments"
          multiple
          accept={ALLOWED_ATTACHMENT_EXTENSIONS}
          onChange={handleFileChange}
          className={styles.fileInput}
          aria-describedby={
            fileError ? "attachments-error" : undefined
          }
        />

        <label
          htmlFor="attachments"
          className={`${styles.fileLabel} ${
            isDraggingFiles
              ? styles.isDraggingFiles
              : ""
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

          <small>
            {t("fileUpload.supportedFormats")}
          </small>
        </label>
      </div>

      {fileError && (
        <p
          id="attachments-error"
          className={styles.fileError}
          role="alert"
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
            <div
              key={`${file.name}-${index}`}
              className={styles.fileItem}
            >
              <span className={styles.fileName}>
                {file.name}
              </span>

              <span className={styles.fileSize}>
                {(file.size / 1024 / 1024).toFixed(2)}{" "}
                {t("fileUpload.sizeUnit")}
              </span>

              <button
                type="button"
                onClick={() => removeFile(index)}
                className={buttons.removeFileButton}
                aria-label={`${t("fileUpload.removeFile")} ${file.name}`}
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