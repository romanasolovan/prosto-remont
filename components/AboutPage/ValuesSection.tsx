"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, Handshake } from "lucide-react";
import styles from "@/app/[locale]/about/about.module.css";

export default function ValuesSection() {
  const t = useTranslations("about");

  const values = [
    {
      icon: ShieldCheck,
      title: t("values.items.first.title"),
      text: t("values.items.first.text"),
    },
    {
      icon: Sparkles,
      title: t("values.items.second.title"),
      text: t("values.items.second.text"),
    },
    {
      icon: Handshake,
      title: t("values.items.third.title"),
      text: t("values.items.third.text"),
    },
  ];

  return (
    <section
      className={styles.valuesSection}
      aria-labelledby="about-values-title"
    >
      <div className="container">
        <div className={styles.valuesInner}>
          <motion.div
            className={styles.valuesIntro}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7 }}
          >
            <span className={styles.valuesEyebrow}>{t("values.eyebrow")}</span>

            <h2 id="about-values-title" className={styles.valuesTitle}>
              {t("values.title")}
            </h2>

            <p className={styles.valuesDescription}>{t("values.content")}</p>
          </motion.div>

          <div className={styles.valuesGrid}>
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <motion.article
                  key={index}
                  className={styles.valueCard}
                  initial={{ opacity: 0, y: 44 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: index * 0.12 }}
                >
                  <div className={styles.valueCardGlow} aria-hidden="true" />

                  <div className={styles.valueIconWrap} aria-hidden="true">
                    <Icon className={styles.valueIcon} />
                  </div>

                  <div className={styles.valueCardContent}>
                    <h3 className={styles.valueCardTitle}>{value.title}</h3>
                    <p className={styles.valueCardText}>{value.text}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
