"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, Handshake, Building2 } from "lucide-react";
import styles from "./ValuesSection.module.css";

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
    {
      icon: Building2,
      title: t("values.items.fourth.title"),
      text: t("values.items.fourth.text"),
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
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7 }}
          >
            <span className={styles.valuesEyebrow}>{t("values.eyebrow")}</span>
          </motion.div>

          <div className={styles.valuesGrid}>
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <motion.article
                  key={index}
                  className={styles.valueItem}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: index * 0.12 }}
                >
                  <div className={styles.valueItemInner}>
                    <div className={styles.valueIconWrap} aria-hidden="true">
                      <Icon className={styles.valueIcon} />
                    </div>

                    <h3 className={styles.valueTitle}>{value.title}</h3>
                    <p className={styles.valueText}>{value.text}</p>
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
