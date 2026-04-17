"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import styles from "@/app/[locale]/about/about.module.css";

import { ShieldCheck, Hammer, Clock3, Users } from "lucide-react";

export default function StatsHero() {
  const t = useTranslations("about");

  const stats = [
    {
      icon: Hammer,
      value: t("stats.projects"),
      label: "Projects",
    },
    {
      icon: Users,
      value: t("stats.clients"),
      label: "Clients",
    },
    {
      icon: Clock3,
      value: t("stats.years"),
      label: "Years",
    },
    {
      icon: ShieldCheck,
      value: t("stats.area"),
      label: "Coverage",
    },
  ];

  return (
    <section className={styles.statsHero}>
      <div className="container">
        <div className={styles.statsHeroInner}>
          {/* TEXT */}
          <motion.div
            className={styles.statsHeroContent}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className={styles.statsEyebrow}>{t("stats.eyebrow")}</span>

            <h1 className={styles.statsHeroTitle}>{t("stats.title")}</h1>

            <p className={styles.statsHeroDescription}>
              {t("stats.description")}
            </p>
          </motion.div>

          {/* STATS */}
          <div className={styles.statsHeroGrid}>
            {stats.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={index}
                  className={styles.statItem}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.15,
                    duration: 0.6,
                  }}
                >
                  <div className={styles.statIconWrap}>
                    <Icon className={styles.statIcon} />
                  </div>

                  <div className={styles.statTextBlock}>
                    <span className={styles.statValue}>{item.value}</span>
                    <span className={styles.statLabel}>{item.label}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
