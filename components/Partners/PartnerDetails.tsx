"use client";

import Image from "next/image";
import type { CSSProperties, RefObject } from "react";

import type { Partner } from "./types";

import styles from "./PartnerDetails.module.css";

type PartnerDetailsStyle = CSSProperties & {
  "--partner-details-left": string;
  "--partner-details-arrow-left": string;
};

type PartnerDetailsProps = {
  partner: Partner;
  description: string;
  popupPosition: {
    left: number;
    arrowLeft: number;
  } | null;
  detailsRef: RefObject<HTMLDivElement | null>;
  closeDetailsLabel: string;
  visitWebsiteLabel: string;
  readMoreLabel: string;
  onReadMore: () => void;
  onClose: () => void;
};

const COMPACT_DESCRIPTION_LENGTH = 280;

export default function PartnerDetails({
  partner,
  description,
  popupPosition,
  detailsRef,
  closeDetailsLabel,
  visitWebsiteLabel,
  readMoreLabel,
  onReadMore,
  onClose,
}: PartnerDetailsProps) {
  const shouldShowToggle =
    description.length > COMPACT_DESCRIPTION_LENGTH;

  const detailsStyle: PartnerDetailsStyle | undefined =
    popupPosition
      ? {
          "--partner-details-left": `${popupPosition.left}px`,
          "--partner-details-arrow-left": `${popupPosition.arrowLeft}px`,
        }
      : undefined;

  return (
    <div
      ref={detailsRef}
      id={`partner-details-${partner.id}`}
      className={`${styles.partnerDetails} ${
        popupPosition ? styles.isPositioned : ""
      }`}
      style={detailsStyle}
      role="region"
      aria-label={partner.name}
      aria-live="polite"
    >
      <div
        className={styles.detailsHighlight}
        aria-hidden="true"
      />

      <div className={styles.detailsContent}>
        <div className={styles.detailsIdentity}>
          <span className={styles.detailsLogoFrame}>
            {partner.logoUrl ? (
              <Image
                src={partner.logoUrl}
                alt={`${partner.name} logo`}
                width={52}
                height={52}
                className={styles.detailsLogo}
              />
            ) : (
              <span
                className={styles.detailsMark}
                aria-hidden="true"
              >
                {partner.name.charAt(0)}
              </span>
            )}
          </span>

          <div className={styles.detailsText}>
            <h3 className={styles.detailsName}>
              {partner.name}
            </h3>

            {description ? (
              <>
                <p className={styles.detailsDescription}>
                  {description}
                </p>

                {shouldShowToggle ? (
                  <button
                    type="button"
                    className={styles.readMoreButton}
                    onClick={onReadMore}
                    aria-haspopup="dialog"
                    aria-controls={`partner-dialog-${partner.id}`}
                  >
                    {readMoreLabel}
                  </button>
                ) : null}
              </>
            ) : null}
          </div>
        </div>

        <div className={styles.detailsActions}>
          {partner.href ? (
            <a
              href={partner.href}
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

          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label={closeDetailsLabel}
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
      </div>
    </div>
  );
}