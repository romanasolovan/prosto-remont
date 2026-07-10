"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  Focus,
  Handshake,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

import styles from "./ValuesSection.module.css";

const valueItems = [
  {
    key: "first",
    icon: ShieldCheck,
  },
  {
    key: "second",
    icon: Focus,
  },
  {
    key: "third",
    icon: Handshake,
  },
  {
    key: "fourth",
    icon: Workflow,
  },
  {
    key: "fifth",
    icon: HeartHandshake,
  },
  {
    key: "sixth",
    icon: BadgeCheck,
  },
  {
    key: "seventh",
    icon: Sparkles,
  },
] as const;

export default function ValuesSection() {
  const t = useTranslations("about");

  return (
    <section
      className={styles.valuesSection}
      aria-labelledby="about-values-title"
    >
      <div className="container">
        <div className={styles.valuesInner}>
          <motion.header
            className={styles.valuesHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.65 }}
          >
            <h2 id="about-values-title" className={styles.valuesEyebrow}>
              {t("values.eyebrow")}
            </h2>
          </motion.header>

          <div className={styles.valuesGrid}>
            {valueItems.map(({ key, icon: Icon }, index) => (
              <motion.article
                key={key}
                className={styles.valueItem}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.07,
                }}
              >
                <div className={styles.valueItemInner}>
                  <span className={styles.valueNumber} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className={styles.valueIconWrap} aria-hidden="true">
                    <Icon className={styles.valueIcon} />
                  </div>

                  <div className={styles.valueContent}>
                    <h3 className={styles.valueTitle}>
                      {t(`values.items.${key}.title`)}
                    </h3>

                    <p className={styles.valueText}>
                      {t(`values.items.${key}.text`)}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
