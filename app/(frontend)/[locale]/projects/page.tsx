import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ProjectCard from "@/components/Projects/ProjectCard/ProjectCard";
import { getProjects } from "@/lib/getProjects";
import type { PublicProject } from "@/types/projects";

import styles from "./projects.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "metadata.projects",
  });

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
  const t = await getTranslations({
    locale,
    namespace: "projects",
  });

  const projects: PublicProject[] = await getProjects();

  return (
    <main className={styles.projectsPage}>
      <section className={styles.projectsSection}>
        <div className="container">
          <div className={styles.projectsIntro}>
            <span className={styles.projectsEyebrow}>
              {t("section.eyebrow")}
            </span>

            <h2 className={styles.projectsTitle}>
              {t("section.title")}
            </h2>

            <p className={styles.projectsLead}>
              {t("section.description")}
            </p>
          </div>

          <div className={styles.projectsList}>
            {projects.map((project, index) => {
              const primaryCategory = project.categories[0];

              return (
                <ProjectCard
                  key={project.slug}
                  locale={locale}
                  slug={project.slug}
                  title={project.title}
                  category={primaryCategory?.name ?? ""}
                  description={project.description}
                  images={project.coverImages}
                  index={index}
                  isReversed={index % 2 !== 0}
                />
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
