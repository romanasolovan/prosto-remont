"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import type { Partner } from "./types";

import styles from "./PartnerDetails.module.css";

type PartnerDialogProps = {
  partner: Partner;
  description: string;
  closeDetailsLabel: string;
  visitWebsiteLabel: string;
  showLessLabel: string;
  onShowLess: () => void;
  onClose: () => void;
};

export default function PartnerDialog({
  partner,
  description,
  closeDetailsLabel,
  visitWebsiteLabel,
  showLessLabel,
  onShowLess,
  onClose,
}: PartnerDialogProps) {
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

  const closeDialog = () => {
    const dialog = dialogRef.current;

    if (dialog?.open) {
      dialog.close();
    }

    onClose();
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
      id={`partner-dialog-${partner.id}`}
      className={styles.partnerDialog}
      aria-label={partner.name}
      onCancel={(event) => {
        event.preventDefault();
        closeDialog();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          closeDialog();
        }
      }}
    >
      <div
        className={styles.dialogInner}
        onClick={(event) => {
          event.stopPropagation();
        }}
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
                  <p
                    className={`${styles.detailsDescription} ${styles.isDescriptionExpanded}`}
                  >
                    {description}
                  </p>

                  <button
                    type="button"
                    className={styles.readMoreButton}
                    onClick={collapseDialog}
                  >
                    {showLessLabel}
                  </button>
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
              onClick={closeDialog}
              aria-label={closeDetailsLabel}
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
        </div>
      </div>
    </dialog>
  );
}