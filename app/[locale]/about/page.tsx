import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import styles from "./about.module.css";
import ClientOpinions from "@/app/components/ClientOpinions/ClientOpinions";

const StatIcons = {
  projects: (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="6" y="14" width="28" height="22" rx="1" />
      <path d="M14 14V10a6 6 0 0 1 12 0v4" />
      <path d="M6 22h28" />
      <circle cx="20" cy="28" r="2" />
    </svg>
  ),
  clients: (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="15" cy="14" r="5" />
      <circle cx="27" cy="14" r="5" />
      <path d="M4 34c0-6 5-10 11-10" />
      <path d="M36 34c0-6-5-10-11-10" />
      <path d="M15 24c2.5-1 5.5-1 8 0" />
    </svg>
  ),
  area: (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="6" y="6" width="28" height="28" rx="1" />
      <path d="M6 16h28M16 6v28" />
      <path d="M16 16l8 8" />
      <path d="M24 16h-8v8" />
    </svg>
  ),
  years: (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="14" />
      <path d="M20 10v10l6 4" />
      <path d="M8 20h2M30 20h2M20 8v2M20 30v2" />
    </svg>
  ),
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.about" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function About() {
  const t = useTranslations("about");

  const stats = [
    {
      key: "projects",
      icon: StatIcons.projects,
      value: t("stats.projects"),
    },
    {
      key: "clients",
      icon: StatIcons.clients,
      value: t("stats.clients"),
    },
    {
      key: "area",
      icon: StatIcons.area,
      value: t("stats.area"),
    },
    {
      key: "years",
      icon: StatIcons.years,
      value: t("stats.years"),
    },
  ];

  return (
    <main className={styles.aboutPage}>
      <section className={styles.heroSection} aria-labelledby="about-title">
        <div className="container">
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <span className={styles.eyebrow}>{t("story.title")}</span>
              <h1 id="about-title" className={styles.heroTitle}>
                {t("hero.title")}
              </h1>
              <p className={styles.heroSub}>{t("hero.subtitle")}</p>
            </div>

            <div className={styles.heroAccent} aria-hidden="true">
              <div className={styles.heroAccentLine} />
              <div className={styles.heroAccentBox} />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.statsSection} aria-labelledby="stats-title">
        <div className="container">
          <div className={styles.statsHeader}>
            <p id="stats-title" className={styles.statsSectionLabel}>
              {t("stats.title")}
            </p>
          </div>

          <div className={styles.statsGrid}>
            {stats.map(({ key, icon, value }, index) => (
              <article
                key={key}
                className={styles.statCard}
                style={{ ["--delay" as string]: `${index * 120}ms` }}
              >
                <div className={styles.statIcon}>{icon}</div>
                <p className={styles.statValue}>{value}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.storySection} aria-labelledby="story-title">
        <div className="container">
          <div className={styles.storyGrid}>
            <article className={styles.storyCard}>
              <span className={styles.sectionIndex} aria-hidden="true">
                01
              </span>
              <h2 id="story-title" className={styles.sectionTitle}>
                {t("story.title")}
              </h2>
              <p className={styles.sectionText}>{t("story.content")}</p>
            </article>

            <article className={styles.storyCard}>
              <span className={styles.sectionIndex} aria-hidden="true">
                02
              </span>
              <h2 className={styles.sectionTitle}>{t("values.title")}</h2>
              <p className={styles.sectionText}>{t("values.content")}</p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.whySection} aria-labelledby="why-title">
        <div className="container">
          <div className={styles.whyLayout}>
            <article className={styles.whyCard}>
              <span
                className={`${styles.sectionIndex} ${styles.sectionIndexLight}`}
                aria-hidden="true"
              >
                03
              </span>
              <h2 id="why-title" className={styles.sectionTitleLight}>
                {t("why.title")}
              </h2>
              <p className={styles.sectionTextLight}>{t("why.content")}</p>
            </article>

            <div className={styles.opinionsShell}>
              <ClientOpinions />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
