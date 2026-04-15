"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import styles from "./WhyChooseUs.module.css";

type PillarKey = "craft" | "precision" | "clarity";

const PillarIcons: Record<PillarKey, ReactNode> = {
  craft: (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 31l17-17" />
      <path d="M28 11l9 9" />
      <path d="M12 36l6-1 19-19-5-5-19 19-1 6z" />
      <path d="M26 13l9 9" />
    </svg>
  ),
  precision: (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="11" />
      <circle cx="24" cy="24" r="4" />
      <path d="M24 13V9" />
      <path d="M24 39v-4" />
      <path d="M35 24h4" />
      <path d="M9 24h4" />
      <path d="M31.5 16.5l2.8-2.8" />
    </svg>
  ),
  clarity: (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="13" y="11" width="22" height="26" rx="2" />
      <path d="M18 19h12" />
      <path d="M18 24h12" />
      <path d="M18 29h8" />
      <path d="M31 14.5l4.5 4.5" />
    </svg>
  ),
};

export default function WhyChooseUs() {
  const t = useTranslations("about.whyChooseUs");
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const pillars = [
    {
      key: "craft" as const,
      title: t("pillars.first.title"),
      description: t("pillars.first.description"),
      tone: styles.cardDark,
    },
    {
      key: "precision" as const,
      title: t("pillars.second.title"),
      description: t("pillars.second.description"),
      tone: styles.cardWarm,
    },
    {
      key: "clarity" as const,
      title: t("pillars.third.title"),
      description: t("pillars.third.description"),
      tone: styles.cardLight,
    },
  ];

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(false);

          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setIsVisible(true);
            });
          });
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.35,
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.whySection}
      aria-labelledby="why-choose-us-title"
    >
      <div className={styles.gridFade} aria-hidden="true" />
      <div className={styles.orbitTop} aria-hidden="true" />
      <div className={styles.orbitBottom} aria-hidden="true" />

      <div className="container">
        <div className={styles.whyShell}>
          <div className={styles.whyIntro}>
            <span className={styles.sectionLabel}>{t("eyebrow")}</span>

            <h2 className={styles.whyTitle} id="why-choose-us-title">
              {t("title")}
            </h2>

            <p className={styles.whyDescription}>{t("description")}</p>

            <Link href="/about" className="btn-round btn-round--lg">
              <span className="btn-round__inner">
                <span className="btn-round__text btn-round__text--lg">
                  {t("button")}
                </span>
              </span>
            </Link>
          </div>

          <div className={styles.whyGrid}>
            {pillars.map((pillar, index) => (
              <article
                className={`${styles.whyCard} ${pillar.tone} ${
                  isVisible ? styles.isVisible : ""
                }`}
                key={pillar.key}
                style={
                  { ["--card-index" as string]: index } as React.CSSProperties
                }
              >
                <div className={styles.whyCardHead}>
                  <div className={styles.iconCircle} aria-hidden="true">
                    {PillarIcons[pillar.key]}
                  </div>

                  <h3 className={styles.whyCardTitle}>{pillar.title}</h3>
                </div>

                <p className={styles.whyCardDescription}>
                  {pillar.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
