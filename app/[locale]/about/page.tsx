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
    <div className={styles.aboutPage}>
      {/* Centered header, refined */}
      <header className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.pageTitle}>{t("hero.title")}</h1>
          <p className={styles.pageDescription}>{t("hero.subtitle")}</p>
        </div>
      </header>

      <main className={styles.main}>
        <div className="container">
          <section className={styles.contentGrid}>
            <article className={styles.card}>
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
          </section>
        </div>

        {/* Opinions section on About page */}
        <section className={styles.opinionsSection} id="opinions">
          <ClientOpinions />
        </section>
      </main>
    </div>
  );
}
