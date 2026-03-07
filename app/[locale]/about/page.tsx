import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import styles from "./about.module.css";
import ClientOpinions from "@/app/components/ClientOpinions/ClientOpinions";

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

  return (
    <main className={styles.aboutPage}>
      <section className={styles.aboutSection} aria-labelledby="about-title">
        <div className="container">
          <div className={styles.aboutIntro}>
            <span className={styles.eyebrow}>{t("hero.title")}</span>
            <h1 id="about-title" className={styles.mainTitle}>
              {t("story.title")}
            </h1>
            <p className={styles.mainDescription}>{t("hero.subtitle")}</p>
          </div>

          <div className={styles.contentGrid}>
            <article className={`${styles.card} ${styles.storyCard}`}>
              <h2 className={styles.cardTitle}>{t("story.title")}</h2>
              <p className={styles.cardText}>{t("story.content")}</p>
            </article>

            <article className={styles.card}>
              <h2 className={styles.cardTitle}>{t("values.title")}</h2>
              <p className={styles.cardText}>{t("values.content")}</p>
            </article>

            <article className={styles.card}>
              <h2 className={styles.cardTitle}>{t("why.title")}</h2>
              <p className={styles.cardText}>{t("why.content")}</p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.opinionsSection} id="opinions">
        <ClientOpinions />
      </section>
    </main>
  );
}
