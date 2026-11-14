"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { Link } from "@/navigation";
import type { PublicProject } from "@/types/projects";
import DataLoader from "@/components/ui/DataLoader/DataLoader";

import ProjectVideoShowcase from "./ProjectVideoShowcase";
import ProjectGalleryPreview from "./ProjectGalleryPreview";
import styles from "./ProjectsPreview.module.css";

export default function ProjectsPreview() {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");

  const [projects, setProjects] = useState<PublicProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProjects = async () => {
      setIsLoading(true);
      setHasError(false);

      try {
        const response = await fetch("/api/public/projects", {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch projects: ${response.status}`,
          );
        }

        const data: { projects?: PublicProject[] } =
          await response.json();

        const receivedProjects = Array.isArray(data.projects)
          ? data.projects
          : [];

        setProjects(receivedProjects);
      } catch (error) {
        if (controller.signal.aborted) return;

        console.error("Failed to load projects preview:", error);
        setProjects([]);
        setHasError(true);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchProjects();

    return () => {
      controller.abort();
    };
  }, []);

  const previewProjects = projects
    .filter((project) => project.coverImages.length > 0)
    .slice(0, 4);

  const hasProjects = previewProjects.length > 0;

  return (
    <section className={styles.projectsPreview} id="projects">
      <div className="container">
        <div className={styles.inner}>
          <header className={styles.hero}>
            <span className={styles.sectionEyebrow}>
              {t("labels.projects")}
            </span>

            <Link
              href="/projects"
              className={styles.portfolioLink}
            >
              {tCommon("viewPortfolio")}
              <span aria-hidden="true">→</span>
            </Link>
          </header>

          {isLoading ? (
            <DataLoader label={tCommon("loading.projects")} />
          ) : !hasError && hasProjects ? (
            <div className={styles.showcase}>
              <ProjectVideoShowcase projects={projects} />

              <ProjectGalleryPreview projects={previewProjects} />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
