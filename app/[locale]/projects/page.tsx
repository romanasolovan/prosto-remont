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
    {
      key: "modernKitchen",
      title: t("list.modernKitchen"),
      category: tCategories("residential"),
    },
    {
      key: "downtownOffice",
      title: t("list.downtownOffice"),
      category: tCategories("commercial"),
    },
    {
      key: "masterBathroom",
      title: t("list.masterBathroom"),
      category: tCategories("residential"),
    },
    {
      key: "historicHome",
      title: t("list.historicHome"),
      category: tCategories("residential"),
    },
    {
      key: "retailStore",
      title: t("list.retailStore"),
      category: tCategories("commercial"),
    },
    {
      key: "basementConversion",
      title: t("list.basementConversion"),
      category: tCategories("residential"),
    },
  ];

  return (
    <div className={styles.projectsPage}>
      <section className={styles.hero}>
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroBackground} aria-hidden="true">
          <span className={styles.bgWord}>{t("hero.bgWord")}</span>
        </div>

        <div className="container">
          <div className={styles.heroInner}>
            <span className={styles.heroEyebrow}>{t("hero.eyebrow")}</span>
            <h1 className={styles.heroTitle}>{t("hero.title")}</h1>
            <p className={styles.subtitle}>{t("hero.subtitle")}</p>
          </div>
        </div>
      </section>

      <section className={styles.projectsSection}>
        <div className="container">
          <div className={styles.projectsIntro}>
            <span className={styles.projectsEyebrow}>
              {t("section.eyebrow")}
            </span>
            <h2 className={styles.projectsTitle}>{t("section.title")}</h2>
            <p className={styles.projectsLead}>{t("section.description")}</p>
          </div>

          <div className={styles.projectsList}>
            {projects.map((project, index) => (
              <article
                key={project.key}
                className={`${styles.projectRow} ${
                  index % 2 === 0 ? styles.rowLeft : styles.rowRight
                }`}
              >
                <div className={styles.projectFrame}>
                  <div className={styles.projectMedia}>
                    <div className={styles.projectImage} />
                    <span className={styles.projectIndex}>
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                  </div>

                  <div className={styles.projectContent}>
                    <div className={styles.projectPlaque}>
                      <span className={styles.projectCategory}>
                        {project.category}
                      </span>
                    </div>

                    <h3 className={styles.projectTitle}>{project.title}</h3>

                    <p className={styles.projectText}>
                      {t(`details.${project.key}.description`)}
                    </p>
                  </div>

                  <span className={styles.projectAccent} aria-hidden="true" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
