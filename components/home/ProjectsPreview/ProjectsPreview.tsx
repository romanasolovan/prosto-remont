"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import type { PublicProject } from "@/types/projects";
import ProjectCardCarousel from "@/components/Projects/ProjectCardCarousel/ProjectCardCarousel";
import styles from "./ProjectsPreview.module.css";

const projectVideos = [
  { id: "video-01", title: "Modern Kitchen", label: "Project video" },
  { id: "video-02", title: "Master Bathroom", label: "Project video" },
  { id: "video-03", title: "Interior Details", label: "Project video" },
];

export default function ProjectsPreview() {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");

  const [projects, setProjects] = useState<PublicProject[]>([]);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/public/projects");

        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const data = await response.json();
        setProjects(data.projects || []);
      } catch (error) {
        console.error("Failed to load preview projects:", error);
        setProjects([]);
      }
    };

    fetchProjects();
  }, []);

  const previewProjects = projects.filter(
    (project) => project.coverImages.length > 0,
  );

  if (!previewProjects.length) return null;

  const pad = (n: number) => String(n).padStart(2, "0");
  const activeVideo = projectVideos[activeVideoIndex];

  const goToPreviousVideo = () => {
    setActiveVideoIndex((current) =>
      current === 0 ? projectVideos.length - 1 : current - 1,
    );
  };

  const goToNextVideo = () => {
    setActiveVideoIndex((current) =>
      current === projectVideos.length - 1 ? 0 : current + 1,
    );
  };

  return (
    <section className={styles.projectsPreview} id="projects">
      <div className="container">
        <div className={styles.inner}>
          <header className={styles.hero}>
            <span className={styles.sectionEyebrow}>
              {t("labels.projects")}
            </span>

            <Link href="/projects" className={styles.portfolioLink}>
              {tCommon("viewPortfolio")}
              <span aria-hidden="true">→</span>
            </Link>
          </header>

          <div className={styles.showcase}>
            <section className={styles.videoPanel} aria-label="Project videos">
              <div className={styles.panelHeader}>
                <span className={styles.panelNumber}>01</span>
                <h3 className={styles.panelTitle}>Projects in motion</h3>

                <div className={styles.videoControls}>
                  <button
                    type="button"
                    className={styles.controlButton}
                    onClick={goToPreviousVideo}
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    className={`${styles.controlButton} ${styles.controlButtonPrimary}`}
                    onClick={goToNextVideo}
                  >
                    →
                  </button>
                </div>
              </div>

              <div className={styles.videoStage}>
                <button
                  type="button"
                  className={`${styles.videoGhost} ${styles.videoGhostLeft}`}
                  onClick={goToPreviousVideo}
                />

                <button type="button" className={styles.videoCard}>
                  <span className={styles.playButton} aria-hidden="true">
                    ▶
                  </span>
                  <span className={styles.videoTitle}>{activeVideo.title}</span>
                  <span className={styles.videoLabel}>{activeVideo.label}</span>
                  <span className={styles.videoCounter}>
                    {pad(activeVideoIndex + 1)} / {pad(projectVideos.length)}
                  </span>
                </button>

                <button
                  type="button"
                  className={`${styles.videoGhost} ${styles.videoGhostRight}`}
                  onClick={goToNextVideo}
                />
              </div>

              <div className={styles.videoDots} aria-hidden="true">
                {projectVideos.map((video, index) => (
                  <button
                    key={video.id}
                    type="button"
                    className={`${styles.videoDot} ${
                      index === activeVideoIndex ? styles.videoDotActive : ""
                    }`}
                    onClick={() => setActiveVideoIndex(index)}
                  />
                ))}
              </div>
            </section>

            <section
              className={styles.projectsPanel}
              aria-label="Project gallery"
            >
              <div className={styles.panelHeader}>
                <span className={styles.panelNumber}>02</span>
                <h3 className={styles.panelTitle}>Project gallery</h3>

                <Link href="/projects" className={styles.allProjectsButton}>
                  View all
                  <span aria-hidden="true">→</span>
                </Link>
              </div>

              <div className={styles.projectsGrid}>
                {previewProjects.map((project, index) => (
                  <Link
                    href={`/projects/${project.slug}`}
                    key={project.slug}
                    className={styles.projectCard}
                  >
                    <div className={styles.projectImage}>
                      <ProjectCardCarousel
                        images={project.coverImages}
                        alt={project.title}
                        mobileImagesPerPage={1}
                        desktopImagesPerPage={1}
                        sizes="(max-width: 767px) 78vw, (max-width: 1199px) 42vw, 260px"
                      />

                      <span className={styles.projectIndex}>
                        {pad(index + 1)}
                      </span>
                      <span className={styles.projectArrow} aria-hidden="true">
                        →
                      </span>
                    </div>

                    <div className={styles.projectInfo}>
                      <h4 className={styles.projectTitle}>{project.title}</h4>
                      <span className={styles.projectType}>
                        {project.category}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              <div className={styles.touchHint}>
                <span aria-hidden="true">↕</span>
                Scroll gallery
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
