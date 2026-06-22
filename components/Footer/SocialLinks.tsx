"use client";

import { useTranslations } from "next-intl";
import styles from "./SocialLinks.module.css";

export default function SocialLinks() {
  const t = useTranslations("footer");

  return (
    <div className={styles.socialBlock}>
      <h4 className={styles.socialTitle}>{t("social.title")}</h4>

      <ul className={styles.socialLinksList} aria-label={t("aria.socialLinks")}>
        <li>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label={t("social.instagram")}
            title={t("social.instagram")}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
        </li>

        <li>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label={t("social.facebook")}
            title={t("social.facebook")}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
        </li>

        <li>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label={t("social.linkedin")}
            title={t("social.linkedin")}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </li>

        <li>
          <a
            href="https://maps.app.goo.gl/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label={t("social.googleMaps")}
            title={t("social.googleMaps")}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
            </svg>
          </a>
        </li>

        <li>
          <a
            href="mailto:pro100twojremont@gmail.com"
            className={styles.socialLink}
            aria-label={t("social.email")}
            title={t("social.email")}
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M4.75 6.75H19.25C20.2165 6.75 21 7.5335 21 8.5V16.5C21 17.4665 20.2165 18.25 19.25 18.25H4.75C3.7835 18.25 3 17.4665 3 16.5V8.5C3 7.5335 3.7835 6.75 4.75 6.75Z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.25 8.25L12 13.5L19.75 8.25"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </li>

        <li>
          <a
            href="https://www.tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label={t("social.tiktok")}
            title={t("social.tiktok")}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.65 7.15C17.43 6.35 16.6 5.05 16.45 3.55H13.35V15.1C13.35 17.02 11.8 18.58 9.88 18.58C7.96 18.58 6.4 17.02 6.4 15.1C6.4 13.18 7.96 11.62 9.88 11.62C10.25 11.62 10.6 11.68 10.93 11.79V8.65C10.59 8.6 10.24 8.58 9.88 8.58C6.28 8.58 3.35 11.5 3.35 15.1C3.35 18.7 6.28 21.62 9.88 21.62C13.48 21.62 16.4 18.7 16.4 15.1V9.37C17.56 10.16 18.95 10.62 20.45 10.62V7.55C19.8 7.55 19.19 7.41 18.65 7.15Z" />
            </svg>
          </a>
        </li>
      </ul>
    </div>
  );
}
