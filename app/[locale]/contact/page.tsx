import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import styles from "./contact.module.css";
import ContactForm from "@/app/components/ContactForm/ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.contact" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function Contact() {
  const t = useTranslations("contact");
  const tDetails = useTranslations("contact.details");

  return (
    <div className={styles.contactPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>{t("hero.title")}</h1>
            <p className={styles.heroSubtitle}>{t("hero.subtitle")}</p>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className={styles.mainSection}>
        <div className="container">
          <div className={styles.contentGrid}>
            {/* Left Column - Contact Info & Trust Signals */}
            <div className={styles.infoColumn}>
              <div className={styles.infoCard}>
                <h2 className={styles.infoTitle}>{t("getInTouch.title")}</h2>
                <p className={styles.infoDescription}>
                  {t("getInTouch.description")}
                </p>

                <div className={styles.contactDetails}>
                  <div className={styles.contactItem}>
                    <div className={styles.iconWrapper}>
                      <svg
                        className={styles.icon}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div className={styles.contactItemContent}>
                      <h4>{tDetails("email")}</h4>
                      <a href="mailto:info@renovate.com">info@renovate.com</a>
                    </div>
                  </div>

                  <div className={styles.contactItem}>
                    <div className={styles.iconWrapper}>
                      <svg
                        className={styles.icon}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div className={styles.contactItemContent}>
                      <h4>{tDetails("phone")}</h4>
                      <a href="tel:+1234567890">+1 (234) 567-890</a>
                    </div>
                  </div>

                  <div className={styles.contactItem}>
                    <div className={styles.iconWrapper}>
                      <svg
                        className={styles.icon}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className={styles.contactItemContent}>
                      <h4>{tDetails("hours")}</h4>
                      <p>{tDetails("hoursValue")}</p>
                    </div>
                  </div>
                </div>

                {/* Trust Signals */}
                <div className={styles.trustSignals}>
                  <div className={styles.trustItem}>
                    <div className={styles.trustNumber}>24h</div>
                    <div className={styles.trustLabel}>Response Time</div>
                  </div>
                  <div className={styles.trustItem}>
                    <div className={styles.trustNumber}>500+</div>
                    <div className={styles.trustLabel}>Projects Completed</div>
                  </div>
                  <div className={styles.trustItem}>
                    <div className={styles.trustNumber}>15+</div>
                    <div className={styles.trustLabel}>Years Experience</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className={styles.formColumn}>
              <div className={styles.formCard}>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
