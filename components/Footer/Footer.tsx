"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import LeaveCommentForm from "@/components/Reviews/LeaveCommentForm/LeaveCommentForm";
import QuoteRequestModal from "@/components/QuoteRequestModal/QuoteRequestModal";
import Partners, { type Partner } from "@/components/Partners/Partners";
import SocialLinks from "./SocialLinks";
import styles from "./Footer.module.css";

type CommentFormData = {
  name: string;
  rating: number;
  comment: string;
};

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("navigation");
  const currentYear = new Date().getFullYear();

  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [partners, setPartners] = useState<Partner[]>([]);

  const openCommentModal = () => {
    setIsCommentModalOpen(true);
  };

  const closeCommentModal = () => {
    setIsCommentModalOpen(false);
  };

  const openQuoteModal = () => {
    setIsQuoteModalOpen(true);
  };

  const closeQuoteModal = () => {
    setIsQuoteModalOpen(false);
  };

  const handleCommentSubmit = async (data: CommentFormData) => {
    console.log("Comment submitted:", data);
  };

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch("/api/public/partners");

        if (!response.ok) {
          throw new Error("Failed to fetch partners");
        }

        const data = await response.json();

        setPartners(data.partners || []);
      } catch (error) {
        console.error("Failed to load partners:", error);
        setPartners([]);
      }
    };

    fetchPartners();
  }, []);

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
            <div className={styles.footerTop}>
              <div className={styles.footerBrand}>
                <h3 className={styles.footerTitle}>PRO100REMONT</h3>
                <p className={styles.footerText}>{t("description")}</p>

                <SocialLinks />
              </div>

              <div className={styles.footerNavArea}>
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
                      <Link href="/reviews">{tNav("reviews")}</Link>
                    </li>
                    <li>
                      <Link href="/blog">{tNav("blog")}</Link>
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

                  <h4 className={styles.footerHeading}>{t("forms.title")}</h4>

                  <ul className={styles.footerActionList}>
                    <li>
                      <button
                        type="button"
                        onClick={openQuoteModal}
                        className={styles.footerActionButton}
                        aria-label={t("aria.openQuote")}
                        aria-haspopup="dialog"
                        aria-expanded={isQuoteModalOpen}
                      >
                        <span
                          className={styles.footerActionIcon}
                          aria-hidden="true"
                        >
                          <svg viewBox="0 0 24 24" fill="none">
                            <path
                              d="M12 5V19M5 12H19"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                        <span>{t("forms.requestQuote")}</span>
                      </button>
                    </li>

                    <li>
                      <button
                        type="button"
                        onClick={openCommentModal}
                        className={styles.footerActionButton}
                        aria-label={t("aria.openComment")}
                        aria-haspopup="dialog"
                        aria-expanded={isCommentModalOpen}
                      >
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
                              d="M9 9.5H15.5M9 12.5H13"
                              stroke="currentColor"
                              strokeWidth="1.7"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                        <span>{t("forms.leaveComment")}</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.footerDivider} />

            <Partners
              partners={partners}
              title={t("partners.title")}
              ariaLabel={t("partners.ariaLabel")}
            />

            <div className={styles.footerBottom}>
              <p>{t("copyright", { year: currentYear })}</p>
            </div>
          </div>
        </div>
      </footer>

      {isCommentModalOpen && (
        <LeaveCommentForm
          onSubmit={handleCommentSubmit}
          onCancel={closeCommentModal}
        />
      )}

      {isQuoteModalOpen && <QuoteRequestModal onClose={closeQuoteModal} />}
    </>
  );
}
