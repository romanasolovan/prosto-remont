import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
// import { Link } from "@/navigation";
import styles from "./contact.module.css";
import ContactForm from "@/app/components/ContactForm/ContactForm";
// import ClientOpinions from "@/app/components/ClientOpinions/LeaveCommentForm";

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
      {/* Main Contact Section */}
      <section className={styles.mainSection}>
        <div className="container">
          <div className={styles.contentGrid}>
            {/* Left Column - Info & Opinions */}
            <div className={styles.leftColumn}>
              {/* Get in Touch Section */}
              <div className={styles.infoSection}>
                <h1 className={styles.pageTitle}>{t("hero.title")}</h1>
                <p className={styles.pageDescription}>{t("hero.subtitle")}</p>

                <div className={styles.contactDetails}>
                  <div className={styles.contactItem}>
                    <div className={styles.contactIcon}>
                      <svg
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
                    <div className={styles.contactContent}>
                      <span className={styles.contactLabel}>
                        {tDetails("email")}
                      </span>
                      <a
                        href="mailto:info@renovate.com"
                        className={styles.contactValue}
                      >
                        info@renovate.com
                      </a>
                    </div>
                  </div>

                  <div className={styles.contactItem}>
                    <div className={styles.contactIcon}>
                      <svg
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
                    <div className={styles.contactContent}>
                      <span className={styles.contactLabel}>
                        {tDetails("phone")}
                      </span>
                      <a href="tel:+1234567890" className={styles.contactValue}>
                        +1 (234) 567-890
                      </a>
                    </div>
                  </div>

                  <div className={styles.contactItem}>
                    <div className={styles.contactIcon}>
                      <svg
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
                    <div className={styles.contactContent}>
                      <span className={styles.contactLabel}>
                        {tDetails("hours")}
                      </span>
                      <span className={styles.contactValue}>
                        {tDetails("hoursValue")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Client Opinions Redirect Card */}
              <div className={styles.opinionsRedirect}>
                <h3 className={styles.opinionsTitle}>
                  Our Clients&apos; Opinions
                </h3>
                <p className={styles.opinionsText}>
                  See what our satisfied clients have to say about their
                  renovation experience.
                </p>
                <a href="#client-opinions" className={styles.opinionsButton}>
                  View Reviews
                </a>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className={styles.rightColumn}>
              <div className={styles.formWrapper}>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Opinions Section */}
      <section id="client-opinions" className={styles.opinionsSection}>
        {/* <ClientOpinions /> */}
      </section>
    </div>
  );
}
