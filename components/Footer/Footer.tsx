"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import LeaveCommentForm from "@/components/ClientOpinions/LeaveCommentForm";
import QuoteRequestModal from "@/components/QuoteRequestModal/QuoteRequestModal";
import styles from "./Footer.module.css";

type ReviewFormData = {
  name: string;
  rating: number;
  comment: string;
};

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("navigation");
  const currentYear = new Date().getFullYear();

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const openReviewModal = () => {
    setIsReviewModalOpen(true);
  };

  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
  };

  const openQuoteModal = () => {
    setIsQuoteModalOpen(true);
  };

  const closeQuoteModal = () => {
    setIsQuoteModalOpen(false);
  };

  const handleReviewSubmit = async (data: ReviewFormData) => {
    console.log("Review submitted:", data);
  };

  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.footerDecor} aria-hidden="true">
          <span className={styles.footerLineLeft} />
          <span className={styles.footerLineRight} />
          <span className={styles.footerBaseLine} />
        </div>

        <div className="container">
          <div className={styles.footerShell}>
            <div className={styles.footerContent}>
              <div className={styles.footerSection}>
                <h3 className={styles.footerTitle}>PRO100REMONT</h3>
                <p className={styles.footerText}>{t("description")}</p>
              </div>

              <div className={styles.footerSection}>
                <h4 className={styles.footerHeading}>{t("quickLinks")}</h4>

                <ul className={styles.footerLinks}>
                  <li>
                    <Link href="/about">{tNav("about")}</Link>
                  </li>
                  <li>
                    <Link href="/services">{tNav("services")}</Link>
                  </li>
                  <li>
                    <Link href="/projects">{tNav("projects")}</Link>
                  </li>
                  <li>
                    <Link href="/process">{tNav("process")}</Link>
                  </li>
                  <li>
                    <Link href="/reviews">{tNav("reviews")}</Link>
                  </li>
                </ul>

                <h4 className={styles.footerHeading}>Social Media</h4>

                <ul className={styles.socialLinksList}>
                  <li>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      aria-label="Instagram"
                      title="Instagram"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
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
                      aria-label="Facebook"
                      title="Facebook"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
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
                      aria-label="LinkedIn"
                      title="LinkedIn"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  </li>

                  <li>
                    <a
                      href="https://maps.app.goo.gl/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.socialLink} ${styles.mapLink}`}
                      aria-label="Warsaw on Google Maps"
                      title="Warsaw on Google Maps"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>

              <div className={styles.footerSection}>
                <h4 className={styles.footerHeading}>{t("contactInfo")}</h4>

                <ul className={styles.footerLinks}>
                  <li>
                    <a
                      href="mailto:pro100twojremont@gmail.com"
                      className={styles.emailLink}
                    >
                      pro100twojremont@gmail.com
                    </a>
                  </li>
                  <li>
                    <a href="tel:+48796444113">+48 796 444 113</a>
                  </li>
                </ul>

                <h4 className={styles.footerHeading}>Forms</h4>

                <ul className={styles.footerLinks}>
                  <li>
                    <button
                      type="button"
                      onClick={openQuoteModal}
                      className={styles.footerActionButton}
                      aria-haspopup="dialog"
                      aria-expanded={isQuoteModalOpen}
                    >
                      <span
                        className={styles.footerActionIcon}
                        aria-hidden="true"
                      >
                        <svg viewBox="0 0 24 24" fill="none">
                          <path
                            d="M12 5v14M5 12h14"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                      <span>Request a Quote</span>
                    </button>
                  </li>

                  <li>
                    <Link href="/about" className={styles.footerActionButton}>
                      <span
                        className={styles.footerActionIcon}
                        aria-hidden="true"
                      >
                        <svg viewBox="0 0 24 24" fill="none">
                          <path
                            d="M7 10.5C7 7.46243 9.46243 5 12.5 5H16C18.2091 5 20 6.79086 20 9V11.5C20 13.7091 18.2091 15.5 16 15.5H14L10.2 18.4C9.54038 18.9035 8.6 18.4331 8.6 17.6V15.5H8C7.44772 15.5 7 15.0523 7 14.5V10.5Z"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M9 9.5H15.5"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                          />
                          <path
                            d="M9 12.5H13"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                      <span>Client Opinions</span>
                    </Link>
                  </li>

                  <li>
                    <button
                      type="button"
                      onClick={openReviewModal}
                      className={styles.footerActionButton}
                      aria-haspopup="dialog"
                      aria-expanded={isReviewModalOpen}
                    >
                      <span
                        className={styles.footerActionIcon}
                        aria-hidden="true"
                      >
                        <svg viewBox="0 0 24 24" fill="none">
                          <path
                            d="M13.5 6.5L17.5 10.5"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                          />
                          <path
                            d="M5 19L8.6 18.4L18.2 8.8C18.981 8.019 18.981 6.75368 18.2 5.97267V5.97267C17.419 5.19167 16.1537 5.19167 15.3727 5.97267L5.8 15.545L5 19Z"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span>Leave a Review</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <div className={styles.footerBottom}>
              <p>{t("copyright", { year: currentYear })}</p>
            </div>
          </div>
        </div>
      </footer>

      {isReviewModalOpen && (
        <LeaveCommentForm
          onSubmit={handleReviewSubmit}
          onCancel={closeReviewModal}
        />
      )}

      {isQuoteModalOpen && <QuoteRequestModal onClose={closeQuoteModal} />}
    </>
  );
}
