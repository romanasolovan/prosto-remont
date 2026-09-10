"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import type {
  Brand,
  SupportedLocale,
} from "./types";

import styles from "./TrustedBrands.module.css";

type BrandDialogProps = {
  brand: Brand;
  locale: SupportedLocale;
  description: string;

  brandLabel: string;
  closeLabel: string;
  noDescriptionLabel: string;
  visitWebsiteLabel: string;
  relatedProjectLabel: string;
  viewProjectLabel: string;
  showLessLabel: string;

  getOpenProjectLabel: (title: string) => string;

  onShowLess: () => void;
  onClose: (restoreFocus?: boolean) => void;
};

export default function BrandDialog({
  brand,
  locale,
  description,
  brandLabel,
  closeLabel,
  noDescriptionLabel,
  visitWebsiteLabel,
  relatedProjectLabel,
  viewProjectLabel,
  showLessLabel,
  getOpenProjectLabel,
  onShowLess,
  onClose,
}: BrandDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (!dialog.open) {
      dialog.showModal();
    }

    return () => {
      if (dialog.open) {
        dialog.close();
      }
    };
  }, []);

  const closeDialog = (
  restoreFocus: boolean,
) => {
  const dialog = dialogRef.current;

  if (dialog?.open) {
    dialog.close();
  }

  onClose(restoreFocus);
};

  const collapseDialog = () => {
    const dialog = dialogRef.current;

    if (dialog?.open) {
      dialog.close();
    }

    onShowLess();
  };

  return (
    <dialog
      ref={dialogRef}
      id={`trusted-brand-dialog-${brand.id}`}
      className={styles.brandDialog}
      aria-label={brand.name}
      onCancel={(event) => {
  event.preventDefault();
  closeDialog(true);
}}
      onClick={(event) => {
  if (event.target === event.currentTarget) {
    closeDialog(false);
  }
}}
    >
      <div
        className={styles.brandDialogInner}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className={styles.detailsHeader}>
          <div className={styles.detailsIdentity}>
            <div className={styles.detailsLogo}>
              {brand.logoSrc ? (
                <Image
                  src={brand.logoSrc}
                  alt={
                    brand.logoAlt ||
                    `${brand.name} logo`
                  }
                  fill
                  sizes="56px"
                  className={styles.detailsLogoImage}
                />
              ) : (
                <span
                  className={styles.detailsMark}
                  aria-hidden="true"
                >
                  {brand.mark}
                </span>
              )}
            </div>

            <div className={styles.detailsTitleGroup}>
              <span className={styles.detailsEyebrow}>
                {brandLabel}
              </span>

              <h3 className={styles.detailsName}>
                {brand.name}
              </h3>
            </div>
          </div>

          <button
            type="button"
            className={styles.detailsClose}
            onClick={(event) => {
    const wasKeyboardActivated =
      event.detail === 0;

    closeDialog(wasKeyboardActivated);
  }}
            aria-label={closeLabel}
            autoFocus
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M7 7L17 17M17 7L7 17"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className={styles.brandDialogBody}>
          <div className={styles.detailsInformation}>
            <p
              className={`${styles.detailsDescription} ${styles.dialogDescription}`}
            >
              {description || noDescriptionLabel}
            </p>

            <button
              type="button"
              className={styles.detailsReadMore}
              onClick={collapseDialog}
            >
              {showLessLabel}
            </button>

            {brand.website ? (
              <a
                href={brand.website}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.websiteLink}
              >
                <span>{visitWebsiteLabel}</span>

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M8 16L16 8M10 8H16V14"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            ) : null}
          </div>

          {brand.featuredProject ? (
            <div className={styles.projectPreview}>
              {brand.featuredProject.previewImage ? (
                <div className={styles.projectMedia}>
                  <Image
                    src={
                      brand.featuredProject
                        .previewImage.src
                    }
                    alt={
                      brand.featuredProject
                        .previewImage.alt
                    }
                    fill
                    sizes="96px"
                    className={styles.projectImage}
                  />
                </div>
              ) : null}

              <div className={styles.projectContent}>
                <span className={styles.projectLabel}>
                  {relatedProjectLabel}
                </span>

                <span className={styles.projectTitle}>
                  {brand.featuredProject.title}
                </span>

                <Link
                  href={`/${locale}/projects/${brand.featuredProject.slug}`}
                  className={styles.projectButton}
                  aria-label={getOpenProjectLabel(
                    brand.featuredProject.title,
                  )}
                >
                  <span>{viewProjectLabel}</span>

                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M8 16L16 8M10 8H16V14"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </dialog>
  );
}