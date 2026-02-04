import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import styles from "./projects.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.projects" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function Projects() {
  const t = useTranslations("projects");
  const tCategories = useTranslations("projects.categories");

  const projects = [
    { title: t("list.modernKitchen"), category: tCategories("residential") },
    { title: t("list.downtownOffice"), category: tCategories("commercial") },
    { title: t("list.masterBathroom"), category: tCategories("residential") },
    { title: t("list.historicHome"), category: tCategories("residential") },
    { title: t("list.retailStore"), category: tCategories("commercial") },
    {
      title: t("list.basementConversion"),
      category: tCategories("residential"),
    },
  ];

  return (
    <div className={styles.projectsPage}>
      <section className={styles.hero}>
        <div className="container">
          <h1>{t("hero.title")}</h1>
          <p className={styles.subtitle}>{t("hero.subtitle")}</p>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container">
          <div className={styles.projectsGrid}>
            {projects.map((project, index) => (
              <div key={index} className={styles.projectCard}>
                <div className={styles.projectImage}></div>
                <div className={styles.projectInfo}>
                  <span className={styles.projectCategory}>
                    {project.category}
                  </span>
                  <h3>{project.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
