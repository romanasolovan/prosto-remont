import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import styles from "./about.module.css";

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
      <section className={styles.hero}>
        <div className="container">
          <h1>{t("hero.title")}</h1>
          <p className={styles.subtitle}>{t("hero.subtitle")}</p>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container">
          <div className={styles.content}>
            <h2>{t("story.title")}</h2>
            <p>{t("story.content")}</p>

            <h2>{t("values.title")}</h2>
            <p>{t("values.content")}</p>

            <h2>{t("why.title")}</h2>
            <p>{t("why.content")}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
