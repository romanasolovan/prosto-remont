"use client";

import { useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import HeroStatIcons from "./HeroStatIcons";
import QuoteRequestModal from "@/components/QuoteRequestModal/QuoteRequestModal";
import styles from "./HomeHero.module.css";

type StatIconKey = "projects" | "clients" | "area" | "years" | "warranty";

const StatIcons: Record<StatIconKey, ReactNode> = {
  projects: (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M24 12 36 21v14H12V21l12-9z" />
      <path d="M19 35V26h10v9" />
      <path d="M29.5 16.5 33 13l2.5 2.5" />
    </svg>
  ),
  clients: (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="17" cy="18" r="4.5" />
      <circle cx="31" cy="18" r="4.5" />
      <path d="M10 32c1.6-4.4 5.2-7 10-7" />
      <path d="M38 32c-1.6-4.4-5.2-7-10-7" />
      <path d="M21 27.5c1-.6 2-.9 3-.9s2 .3 3 .9" />
    </svg>
  ),
  area: (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="16" y="16" width="16" height="16" rx="1.5" />
      <path d="M16 11v3M32 11v3M11 16h3M11 32h3" />
      <path d="M37 16h-3M37 32h-3M16 37v-3M32 37v-3" />
    </svg>
  ),
  years: (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M24 10l12 5v8c0 7-5 12-12 15-7-3-12-8-12-15v-8l12-5z" />
      <path d="M20 24l3 3 5-6" />
    </svg>
  ),
  warranty: (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="13" y="10" width="22" height="28" rx="2.5" />
      <path d="M18 17h12" />
      <path d="M18 22h12" />
      <path d="M18 27h7" />
      <path d="M29 32l2.5 2.5L36 29" />
    </svg>
  ),
};

export default function HomeHero() {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const stats = [
    { key: "projects", icon: StatIcons.projects, label: t("stats.projects") },
    { key: "clients", icon: StatIcons.clients, label: t("stats.clients") },
    { key: "area", icon: StatIcons.area, label: t("stats.area") },
    { key: "years", icon: StatIcons.years, label: t("stats.years") },
    { key: "warranty", icon: StatIcons.warranty, label: t("stats.warranty") },
  ] as const;

  return (
    <>
      <section className={styles.hero} aria-labelledby="home-hero-title">
        <div className={styles.gridGlow} aria-hidden="true" />
        <div className={styles.orbitLeft} aria-hidden="true" />
        <div className={styles.orbitRight} aria-hidden="true" />

        <div className="container">
          <div className={styles.heroInner}>
            <div className={styles.topRow}>
              <h1 id="home-hero-title" className={styles.title}>
                <span className={styles.titleLineOne}>
                  {t("hero.titleLineOne")}
                </span>
                <span className={styles.titleLineTwo}>
                  {t("hero.titleLineTwo")}
                </span>
              </h1>
            </div>

            <button
              type="button"
              onClick={() => setIsQuoteModalOpen(true)}
              className={`btn-round btn-round--lg  ${styles.buttonDesktop}`}
            >
              <span className="btn-round__inner">
                <span className="btn-round__text btn-round__text--md">
                  {tCommon("requestQuote")}
                </span>
              </span>
            </button>

            <div className={styles.mobileCtaRow}>
              <button
                type="button"
                onClick={() => setIsQuoteModalOpen(true)}
                className={`btn-round btn-round--sm  ${styles.buttonMobile}`}
              >
                <span className="btn-round__inner">
                  <span className="btn-round__text btn-round__text--sm">
                    {tCommon("requestQuote")}
                  </span>
                </span>
              </button>
            </div>

            <HeroStatIcons items={stats} ariaLabel={t("hero.statsAriaLabel")} />
          </div>
        </div>
      </section>

      {isQuoteModalOpen && (
        <QuoteRequestModal onClose={() => setIsQuoteModalOpen(false)} />
      )}
    </>
  );
}
