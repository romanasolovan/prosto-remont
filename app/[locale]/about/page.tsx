// import { useTranslations } from "next-intl";
// import { getTranslations } from "next-intl/server";
// import type { Metadata } from "next";
// import styles from "./about.module.css";
// import ClientOpinions from "@/app/components/ClientOpinions/ClientOpinions";

// /* stat icons */
// const StatIcons = {
//   projects: (
//     <svg
//       viewBox="0 0 40 40"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.4"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       aria-hidden="true"
//     >
//       <rect x="6" y="14" width="28" height="20" rx="1" />
//       <path d="M14 14V10a6 6 0 0 1 12 0v4" />
//       <path d="M6 21h28" />
//     </svg>
//   ),
//   clients: (
//     <svg
//       viewBox="0 0 40 40"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.4"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       aria-hidden="true"
//     >
//       <circle cx="14" cy="14" r="4.5" />
//       <circle cx="26" cy="14" r="4.5" />
//       <path d="M6 30c1.5-4.5 5.5-7 10-7" />
//       <path d="M34 30c-1.5-4.5-5.5-7-10-7" />
//     </svg>
//   ),
//   area: (
//     <svg
//       viewBox="0 0 40 40"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.4"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       aria-hidden="true"
//     >
//       <rect x="7" y="7" width="26" height="26" rx="1" />
//       <path d="M7 18h26M18 7v26" />
//     </svg>
//   ),
//   years: (
//     <svg
//       viewBox="0 0 40 40"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.4"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       aria-hidden="true"
//     >
//       <circle cx="20" cy="20" r="13" />
//       <path d="M20 12v8l5 3" />
//     </svg>
//   ),
// };

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ locale: string }>;
// }): Promise<Metadata> {
//   const { locale } = await params;
//   const t = await getTranslations({ locale, namespace: "metadata.about" });

//   return {
//     title: t("title"),
//     description: t("description"),
//   };
// }

// export default function About() {
//   const t = useTranslations("about");

//   const stats = [
//     {
//       key: "projects",
//       icon: StatIcons.projects,
//       value: t("stats.projects"),
//     },
//     {
//       key: "clients",
//       icon: StatIcons.clients,
//       value: t("stats.clients"),
//     },
//     {
//       key: "area",
//       icon: StatIcons.area,
//       value: t("stats.area"),
//     },
//     {
//       key: "years",
//       icon: StatIcons.years,
//       value: t("stats.years"),
//     },
//   ];

//   return (
//     <main className={styles.aboutPage}>
//       <section className={styles.heroSection} aria-labelledby="about-title">
//         <div className="container">
//           <div className={styles.heroInner}>
//             <div className={styles.heroCopy}>
//               <span className={styles.eyebrow}>{t("story.title")}</span>
//               <h1 id="about-title" className={styles.heroTitle}>
//                 {t("hero.title")}
//               </h1>
//               <p className={styles.heroSub}>{t("hero.subtitle")}</p>
//             </div>

//             <div className={styles.heroAccent} aria-hidden="true">
//               <div className={styles.heroAccentLine} />
//               <div className={styles.heroAccentBox} />
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className={styles.statsSection} aria-labelledby="stats-title">
//         <div className="container">
//           <div className={styles.statsHeader}>
//             <p id="stats-title" className={styles.statsSectionLabel}>
//               {t("stats.title")}
//             </p>
//           </div>

//           <div className={styles.statsGrid}>
//             {stats.map(({ key, icon, value }, index) => (
//               <article
//                 key={key}
//                 className={styles.statCard}
//                 style={{ ["--delay" as string]: `${index * 120}ms` }}
//               >
//                 <div className={styles.statIcon}>{icon}</div>
//                 <p className={styles.statValue}>{value}</p>
//               </article>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className={styles.storySection} aria-labelledby="story-title">
//         <div className="container">
//           <div className={styles.storyGrid}>
//             <article className={styles.storyCard}>
//               <span className={styles.sectionIndex} aria-hidden="true">
//                 01
//               </span>
//               <h2 id="story-title" className={styles.sectionTitle}>
//                 {t("story.title")}
//               </h2>
//               <p className={styles.sectionText}>{t("story.content")}</p>
//             </article>

//             <article className={styles.storyCard}>
//               <span className={styles.sectionIndex} aria-hidden="true">
//                 02
//               </span>
//               <h2 className={styles.sectionTitle}>{t("values.title")}</h2>
//               <p className={styles.sectionText}>{t("values.content")}</p>
//             </article>
//           </div>
//         </div>
//       </section>

//       <section className={styles.whySection} aria-labelledby="why-title">
//         <div className="container">
//           <div className={styles.whyLayout}>
//             <article className={styles.whyCard}>
//               <span
//                 className={`${styles.sectionIndex} ${styles.sectionIndexLight}`}
//                 aria-hidden="true"
//               >
//                 03
//               </span>
//               <h2 id="why-title" className={styles.sectionTitleLight}>
//                 {t("why.title")}
//               </h2>
//               <p className={styles.sectionTextLight}>{t("why.content")}</p>
//             </article>

//             <div className={styles.opinionsShell}>
//               <ClientOpinions />
//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }

import { useTranslations } from "next-intl";
import styles from "./about.module.css";
import ClientOpinions from "@/app/components/ClientOpinions/ClientOpinions";

/* stat icons */
const StatIcons = {
  projects: (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
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
      strokeWidth="1.65"
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
      strokeWidth="1.6"
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
      strokeWidth="1.8"
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
    {
      key: "projects",
      icon: StatIcons.projects,
      text: t("stats.projects"),
    },
    {
      key: "clients",
      icon: StatIcons.clients,
      text: t("stats.clients"),
    },
    {
      key: "area",
      icon: StatIcons.area,
      text: t("stats.area"),
    },
    {
      key: "years",
      icon: StatIcons.years,
      text: t("stats.years"),
    },
  ];

  return (
    <main className={styles.aboutPage}>
      <section
        className={styles.statsSection}
        aria-labelledby="about-stats-title"
      >
        <div className="container">
          <div className={styles.statsInner}>
            <h1 id="about-stats-title" className={styles.statsTitle}>
              {t("stats.title")}
            </h1>

            <div className={styles.statsGrid}>
              {stats.map((stat) => (
                <article key={stat.key} className={styles.statCard}>
                  <div className={styles.statIcon}>{stat.icon}</div>
                  <p className={styles.statText}>{stat.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section
        className={styles.storyValuesSection}
        aria-labelledby="about-story-title"
      >
        <div className="container">
          <div className={styles.storyValuesInner}>
            <article
              className={`${styles.storyValuesCard} ${styles.storyCard}`}
            >
              <div className={styles.storyValuesContent}>
                <h2 id="about-story-title" className={styles.storyValuesTitle}>
                  {t("story.title")}
                </h2>
                <p className={styles.storyValuesText}>{t("story.content")}</p>
              </div>
            </article>

            <article
              className={`${styles.storyValuesCard} ${styles.valuesCard}`}
            >
              <div className={styles.storyValuesContent}>
                <h2 className={styles.storyValuesTitle}>{t("values.title")}</h2>
                <p className={styles.storyValuesText}>{t("values.content")}</p>
              </div>
            </article>
          </div>
        </div>
      </section>
      <section className={styles.whySection} aria-labelledby="about-why-title">
        <div className="container">
          <div className={styles.whySectionInner}>
            <article className={styles.whyCard}>
              <div className={styles.whyCardContent}>
                <h2 id="about-why-title" className={styles.whyTitle}>
                  {t("why.title")}
                </h2>
                <p className={styles.whyText}>{t("why.content")}</p>
              </div>
            </article>

            <div className={styles.opinionsWrapper}>
              <ClientOpinions />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
