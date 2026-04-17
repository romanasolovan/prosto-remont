"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import styles from "@/app/[locale]/about/about.module.css";

export default function StorySection() {
  const t = useTranslations("about");

  return (
    <section className={styles.storySection}>
      <div className="container">
        <div className={styles.storyInner}>
          {/* LEFT CONTENT */}
          <motion.div
            className={styles.storyContent}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className={styles.storyEyebrow}>{t("story.eyebrow")}</span>

            <h2 className={styles.storyTitle}>{t("story.title")}</h2>

            <p className={styles.storyText}>{t("story.content")}</p>
          </motion.div>

          {/* RIGHT VISUAL */}
          <motion.div
            className={styles.storyVisual}
            initial={{ opacity: 0, scaleY: 0.6 }}
            whileInView={{ opacity: 1, scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className={styles.storyLine} />
            <div className={styles.storyGlow} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
