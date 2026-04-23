"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/navigation";
// import styles from "@/app/[locale]/about/about.module.css";
import styles from "./StorySection.module.css";

export default function StorySection() {
  const t = useTranslations("about");

  return (
    <section
      className={styles.storySection}
      aria-labelledby="about-story-title"
    >
      <div className="container">
        <div className={styles.storyInner}>
          <motion.div
            className={styles.storyMedia}
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8 }}
          >
            <div className={styles.storyImageFrame}>
              <div className={styles.storyImageWrap}>
                <Image
                  src="/about/aboutBg.jpg"
                  alt={t("story.title")}
                  fill
                  className={styles.storyImage}
                  sizes="(max-width: 767px) 100vw, 50vw"
                  priority={false}
                />
                <div className={styles.storyImageOverlay} aria-hidden="true" />
              </div>

              <div className={styles.storyBadge}>
                <div className={styles.storyBadgeContent}>
                  <span className={styles.storyBadgeEyebrow}>
                    {t("story.eyebrow")}
                  </span>

                  <h2 id="about-story-title" className={styles.storyBadgeTitle}>
                    {t("story.title")}
                  </h2>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className={styles.storyContent}
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, delay: 0.12 }}
          >
            <p className={styles.storyText}>{t("story.content")}</p>

            <Link href="/projects" className={styles.storyButton}>
              {t("story.button")}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
