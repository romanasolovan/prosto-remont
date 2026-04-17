"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/navigation";
import styles from "@/app/[locale]/about/about.module.css";

export default function ClientOpinionsCTA() {
  const t = useTranslations("about");

  return (
    <section className={styles.ctaSection} aria-labelledby="about-cta-title">
      <div className="container">
        <motion.div
          className={styles.ctaInner}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className={styles.ctaEyebrow}>{t("cta.eyebrow")}</span>

          <h2 id="about-cta-title" className={styles.ctaTitle}>
            {t("cta.title")}
          </h2>

          <p className={styles.ctaText}>{t("cta.description")}</p>

          <Link href="/reviews" className={styles.ctaButton}>
            {t("cta.button")}
            <span className={styles.ctaArrow} aria-hidden="true">
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
