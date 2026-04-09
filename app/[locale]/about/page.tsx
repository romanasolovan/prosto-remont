import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import styles from "./about.module.css";
import TrustedBrands from "@/components/home/TrustedBrands/TrustedBrands";
import WhyChooseUs from "@/components/home/WhyChooseUs/WhyChooseUs";

const StatIcons = {
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
};

export default function About() {
  const t = useTranslations("about");

  const stats = [
    { key: "projects", icon: StatIcons.projects, text: t("stats.projects") },
    { key: "clients", icon: StatIcons.clients, text: t("stats.clients") },
    { key: "area", icon: StatIcons.area, text: t("stats.area") },
    { key: "years", icon: StatIcons.years, text: t("stats.years") },
  ];

  return (
    <main className={styles.aboutPage}>
      <div className={styles.pageDecor} aria-hidden="true">
        <span className={styles.decorLeft} />
        <span className={styles.decorLeftSoft} />
        <span className={styles.decorRight} />
        <span className={styles.decorRightSoft} />
      </div>

      <section
        id="stats"
        className={styles.statsSection}
        aria-labelledby="about-stats-title"
      >
        <div className={styles.statsBackground} aria-hidden="true">
          <span className={styles.bgWord}>Craft</span>
        </div>

        <div className="container">
          <div className={styles.statsInner}>
            <div className={styles.statsMeta}>
              <span className={styles.statsEyebrow}>{t("stats.eyebrow")}</span>

              <h1 id="about-stats-title" className={styles.statsTitle}>
                {t("stats.title")}
              </h1>

              <p className={styles.statsLead}>{t("stats.description")}</p>
            </div>

            <div className={styles.statsGrid}>
              {stats.map((stat, i) => (
                <article
                  key={stat.key}
                  className={styles.statCard}
                  style={{ ["--i" as string]: i }}
                >
                  <div className={styles.statTop}>
                    <span className={styles.statIndex}>0{i + 1}</span>

                    <div className={styles.statIconWrap}>
                      <div className={styles.statIcon}>{stat.icon}</div>
                    </div>
                  </div>

                  <p className={styles.statText}>{stat.text}</p>
                  <div className={styles.statLine} aria-hidden="true" />
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="story"
        className={styles.storyValuesSection}
        aria-labelledby="about-story-title"
      >
        <div className="container">
          <div className={styles.storyValuesInner}>
            <article className={`${styles.svCard} ${styles.storyCard}`}>
              <div className={styles.svCardInner}>
                <span className={styles.svLabel}>01</span>
                <h2 id="about-story-title" className={styles.svTitle}>
                  {t("story.title")}
                </h2>
                <p className={styles.svText}>{t("story.content")}</p>
              </div>
              <div className={styles.svAccent} aria-hidden="true" />
            </article>

            <article className={`${styles.svCard} ${styles.valuesCard}`}>
              <div className={styles.svCardInner}>
                <span className={styles.svLabel}>02</span>
                <h2 className={styles.svTitle}>{t("values.title")}</h2>
                <p className={styles.svText}>{t("values.content")}</p>
              </div>
              <div className={styles.svAccent} aria-hidden="true" />
            </article>
          </div>
        </div>
      </section>

      <div id="trusted">
        <TrustedBrands />
      </div>

      <div id="why-choose-us">
        <WhyChooseUs />
      </div>

      <section
        id="why"
        className={styles.whySection}
        aria-labelledby="about-why-title"
      >
        <div className="container">
          <div className={styles.whySectionInner}>
            <article className={styles.whyCard}>
              <span className={styles.whyIndex} aria-hidden="true">
                03
              </span>

              <div className={styles.whyCardContent}>
                <span className={styles.whyEyebrow}>{t("why.eyebrow")}</span>

                <h2 id="about-why-title" className={styles.whyTitle}>
                  {t("why.title")}
                </h2>

                <p className={styles.whyText}>{t("why.content")}</p>

                <Link href="/reviews" className={styles.reviewLink}>
                  Read client opinions
                  <span className={styles.reviewLinkArrow} aria-hidden="true">
                    →
                  </span>
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
