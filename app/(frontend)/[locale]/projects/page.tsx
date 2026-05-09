import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import styles from "./projects.module.css";
import ProjectCard from "@/components/Projects/ProjectCard/ProjectCard";
import { projects } from "@/data/projects";

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

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });
  const tCategories = await getTranslations({
    locale,
    namespace: "projects.categories",
  });

  return (
    <main className={styles.projectsPage}>
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
              <ProjectCard
                key={project.slug}
                locale={locale}
                slug={project.slug}
                title={project.title}
                category={tCategories(project.category)}
                description={project.description}
                images={project.coverImages}
                index={index}
                isReversed={index % 2 !== 0}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
