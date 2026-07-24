"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/navigation";
import { MessageSquareQuote, FileText, Mail } from "lucide-react";
import styles from "./ClientOpinionsCTA.module.css";

export default function ClientOpinionsCTA() {
  const t = useTranslations("about");

  const actions = [
    {
      icon: MessageSquareQuote,
      title: t("cta.items.first.title"),
      text: t("cta.items.first.text"),
      button: t("cta.items.first.button"),
      href: "/reviews",
    },
    {
      icon: FileText,
      title: t("cta.items.second.title"),
      text: t("cta.items.second.text"),
      button: t("cta.items.second.button"),
      href: "/process#request-quote",
    },
    {
      icon: Mail,
      title: t("cta.items.third.title"),
      text: t("cta.items.third.text"),
      button: t("cta.items.third.button"),
      href: "/contact",
    },
  ];

  return (
    <section className={styles.ctaSection} aria-labelledby="about-cta-title">
      <div className="container">
        <div className={styles.ctaInner}>
          <motion.div
            className={styles.ctaIntro}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7 }}
          >
            <span className={styles.ctaEyebrow}>{t("cta.eyebrow")}</span>

            <h2 id="about-cta-title" className={styles.ctaTitle}>
              {t("cta.title")}
            </h2>

            <p className={styles.ctaText}>{t("cta.description")}</p>
          </motion.div>

          <div className={styles.ctaGrid}>
            {actions.map((action, index) => {
              const Icon = action.icon;

              return (
                <motion.article
                  key={index}
                  className={styles.ctaCard}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: index * 0.12 }}
                >
                  <div className={styles.ctaCardInner}>
                    <div className={styles.ctaIconWrap} aria-hidden="true">
                      <Icon className={styles.ctaIcon} />
                    </div>

                    <h3 className={styles.ctaCardTitle}>{action.title}</h3>

                    <p className={styles.ctaCardText}>{action.text}</p>

                    <Link href={action.href} className={styles.ctaButton}>
                      {action.button}
                      <span className={styles.ctaArrow} aria-hidden="true">
                        →
                      </span>
                    </Link>
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
