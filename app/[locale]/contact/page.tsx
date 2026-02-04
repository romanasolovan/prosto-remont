import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import styles from "./contact.module.css";

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
      <section className={styles.hero}>
        <div className="container">
          <h1>{t("hero.title")}</h1>
          <p className={styles.subtitle}>{t("hero.subtitle")}</p>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container">
          <div className={styles.contactGrid}>
            <div className={styles.contactInfo}>
              <h2>{t("getInTouch.title")}</h2>
              <p>{t("getInTouch.description")}</p>

              <div className={styles.contactDetails}>
                <div className={styles.contactItem}>
                  <h4>{tDetails("email")}</h4>
                  <a href="mailto:info@renovate.com">info@renovate.com</a>
                </div>

                <div className={styles.contactItem}>
                  <h4>{tDetails("phone")}</h4>
                  <a href="tel:+1234567890">+1 (234) 567-890</a>
                </div>

                <div className={styles.contactItem}>
                  <h4>{tDetails("hours")}</h4>
                  <p style={{ whiteSpace: "pre-line" }}>
                    {tDetails("hoursValue")}
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.formPlaceholder}>
              <div className={styles.formBox}>
                <p className={styles.formNote}>{t("formNote")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
