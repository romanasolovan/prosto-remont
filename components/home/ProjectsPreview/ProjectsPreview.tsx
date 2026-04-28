"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { projects } from "@/data/projects";
import ProjectCardCarousel from "@/components/Projects/ProjectCardCarousel/ProjectCardCarousel";
import styles from "./ProjectsPreview.module.css";

export default function ProjectsPreview() {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");

  const previewProjects = projects.filter(
    (project) => project.coverImages.length > 0,
  );

  const [activeProjectSlug, setActiveProjectSlug] = useState(
    previewProjects[0]?.slug,
  );

  const activeProject = previewProjects.find(
    (project) => project.slug === activeProjectSlug,
  );

  if (!activeProject) return null;

  return (
    <section className={styles.projectsPreview} id="projects">
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.header}>
            <Link href="/projects" className={styles.allProjectsLink}>
              {tCommon("viewPortfolio")}
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className={styles.projectTabs} aria-label="Project preview tabs">
            {previewProjects.map((project) => (
              <button
                key={project.slug}
                type="button"
                className={`${styles.projectTab} ${
                  project.slug === activeProjectSlug ? styles.activeTab : ""
                }`}
                onClick={() => setActiveProjectSlug(project.slug)}
              >
                {project.title}
              </button>
            ))}
          </div>

          <div className={styles.showcase}>
            <div className={styles.carouselShell}>
              <ProjectCardCarousel
                images={activeProject.coverImages}
                alt={activeProject.title}
                mobileImagesPerPage={1}
                desktopImagesPerPage={1}
                sizes="(max-width: 767px) 100vw, (max-width: 1199px) 90vw, 1120px"
              />
            </div>

            <span className={styles.sideLabel}>{t("labels.projects")}</span>
          </div>

          <Link
            href={`/projects/${activeProject.slug}`}
            className={styles.projectLink}
          >
            View this project
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
