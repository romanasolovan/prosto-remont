"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

import type { PublicProjectMediaItem } from "@/types/projects";
import type { GalleryLabels } from "./ProjectGallery";

import styles from "./GalleryLightbox.module.css";

type GalleryLightboxProps = {
  items: PublicProjectMediaItem[];
  groupTitle: string;
  initialIndex: number;
  labels: GalleryLabels;
  onClose: () => void;
};

export default function GalleryLightbox({
  items,
  groupTitle,
  initialIndex,
  labels,
  onClose,
}: GalleryLightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const item = items[index];

  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;

      if (previousFocus instanceof HTMLElement) {
        previousFocus.focus();
      }
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setIndex((current) =>
          (current - 1 + items.length) % items.length,
        );
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        setIndex((current) =>
          (current + 1) % items.length,
        );
      }

      if (event.key === "Tab") {
        const dialog = dialogRef.current;
        if (!dialog) return;

        const focusable = Array.from(
          dialog.querySelectorAll<HTMLElement>(
            'button:not([disabled]), a[href], video[controls], [tabindex]:not([tabindex="-1"])',
          ),
        ).filter((element) => element.getClientRects().length > 0);

        if (focusable.length === 0) {
          event.preventDefault();
          dialog.focus();
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (
          event.shiftKey &&
          (document.activeElement === first ||
            document.activeElement === dialog)
        ) {
          event.preventDefault();
          last.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === last
        ) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [items.length]);

  const showPrevious = () => {
    setIndex((current) =>
      (current - 1 + items.length) % items.length,
    );
  };

  const showNext = () => {
    setIndex((current) =>
      (current + 1) % items.length,
    );
  };

  if (!item || typeof document === "undefined") {
    return null;
  }

  const caption = item.caption?.trim();
  const isVideo = item.type === "video";

  return createPortal(
    <div className={styles.overlay}>
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-gallery-dialog-title"
        tabIndex={-1}
      >
        <header className={styles.header}>
          <h2
            id="project-gallery-dialog-title"
            className={styles.title}
          >
            {groupTitle}
          </h2>

          <div className={styles.headerActions}>
            <span
              className={styles.counter}
              aria-live="polite"
            >
              {index + 1} / {items.length}
            </span>

            <button
              ref={closeButtonRef}
              type="button"
              className={styles.closeButton}
              onClick={onClose}
              aria-label={labels.close}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                aria-hidden="true"
              >
                <path d="M5 5 19 19M19 5 5 19" />
              </svg>
            </button>
          </div>
        </header>

        <div className={styles.viewer}>
          {items.length > 1 && (
            <button
              type="button"
              className={styles.navigationButton}
              onClick={showPrevious}
              aria-label={labels.previous}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                aria-hidden="true"
              >
                <path d="m15 5-7 7 7 7" />
              </svg>
            </button>
          )}

<div className={styles.mediaContainer}>
  <div className={styles.mediaFrame}>
    {isVideo ? (
      <video
        key={item.id}
        src={item.url}
        poster={item.posterUrl ?? undefined}
        controls
        playsInline
        preload="metadata"
        className={styles.video}
        aria-label={caption || groupTitle}
      />
    ) : (
      <Image
        key={item.id}
        src={item.url}
        alt={caption || groupTitle}
        fill
        sizes="(max-width: 768px) 100vw, 85vw"
        className={styles.image}
      />
    )}
  </div>
</div>


          {items.length > 1 && (
            <button
              type="button"
              className={styles.navigationButton}
              onClick={showNext}
              aria-label={labels.next}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                aria-hidden="true"
              >
                <path d="m9 5 7 7-7 7" />
              </svg>
            </button>
          )}
        </div>      
<footer className={styles.footer}>
  {caption && (
    <p className={styles.caption}>
      {caption}
    </p>
  )}

  {item.sourceUrl && (
    <a
      href={item.sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.sourceLink}
    >
      {labels.viewOriginal}
      <span aria-hidden="true">↗</span>
    </a>
  )}
</footer>              
      </div>
    </div>,
    document.body,
  );
}
