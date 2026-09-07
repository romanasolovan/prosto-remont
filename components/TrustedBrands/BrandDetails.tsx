"use client";

import Image from "next/image";
import Link from "next/link";
import type { RefObject } from "react";

import type {
  Brand,
  BrandDetailsStyle,
  SupportedLocale,
} from "./types";

import styles from "./TrustedBrands.module.css";

type BrandDetailsProps = {
  brand: Brand;
  locale: SupportedLocale;
  description: string;
  detailsStyle: BrandDetailsStyle | undefined;
  detailsRef: RefObject<HTMLDivElement | null>;
  brandLabel: string;
  closeLabel: string;
  noDescriptionLabel: string;
  visitWebsiteLabel: string;
  relatedProjectLabel: string;
  viewProjectLabel: string;
  getOpenProjectLabel: (title: string) => string;
  onClose: () => void;
  readMoreLabel: string;
onReadMore: () => void;
};

const COMPACT_DESCRIPTION_LENGTH = 280;


export default function BrandDetails({
  brand,
  locale,
  description,
  detailsStyle,
  detailsRef,
  brandLabel,
  closeLabel,
  noDescriptionLabel,
  visitWebsiteLabel,
  relatedProjectLabel,
  viewProjectLabel,
  getOpenProjectLabel,
  onClose,
  onReadMore,
  readMoreLabel
}: BrandDetailsProps) {

  const shouldShowReadMore =
    description.length > COMPACT_DESCRIPTION_LENGTH;
  
  return (
    <div
      ref={detailsRef}
      id={`trusted-brand-details-${brand.id}`}
      className={`${styles.brandDetails} ${
        detailsStyle ? styles.isPositioned : ""
      }`}
      style={detailsStyle}
      role="region"
      aria-label={brand.name}
      aria-live="polite"
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
                sizes="48px"
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
          onClick={onClose}
          aria-label={closeLabel}
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

      <div className={styles.detailsBody}>
        <div className={styles.detailsInformation}>
          <p className={styles.detailsDescription}>
    {description || noDescriptionLabel}
          </p>
          
          {shouldShowReadMore ? (
    <button
      type="button"
      className={styles.detailsReadMore}
      onClick={onReadMore}
      aria-haspopup="dialog"
      aria-controls={`trusted-brand-dialog-${brand.id}`}
    >
      {readMoreLabel}
    </button>
  ) : null}

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
                    brand.featuredProject.previewImage.src
                  }
                  alt={
                    brand.featuredProject.previewImage.alt
                  }
                  fill
                  sizes="82px"
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
  );
}