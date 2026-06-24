"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { projects } from "@/data/projects";
import ProjectCardCarousel from "@/components/Projects/ProjectCardCarousel/ProjectCardCarousel";
import styles from "./ProjectsPreview.module.css";

const projectVideos = [
  {
    id: "video-01",
    title: "Kitchen renovation",
    label: "Project video",
  },
  {
    id: "video-02",
    title: "Bathroom finishing",
    label: "Project video",
  },
  {
    id: "video-03",
    title: "Apartment details",
    label: "Project video",
  },
];

export default function ProjectsPreview() {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");

  const previewProjects = projects
    .filter((project) => project.coverImages.length > 0)
    .slice(0, 6);

  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  const pad = (n: number) => String(n).padStart(2, "0");
  const activeVideo = projectVideos[activeVideoIndex];

  return (
    <section className={styles.projectsPreview} id="projects">
      <div className="container">
        <div className={styles.inner}>
          <header className={styles.hero}>
            <div>
              <span className={styles.sectionEyebrow}>
                {t("labels.projects")}
              </span>

              {/* <h2 className={styles.title}>See our work in action.</h2> */}
            </div>

            {/* <p className={styles.description}>
              Explore a selection of projects through short videos and see more
              details on our portfolio page.
            </p> */}

            <Link href="/projects" className={styles.portfolioLink}>
              {tCommon("viewPortfolio")}
              <span aria-hidden="true">→</span>
            </Link>
          </header>

          <div className={styles.showcase}>
            <section
              className={styles.videoPanel}
              aria-labelledby="videos-title"
            >
              <div className={styles.panelHeader}>
                <span className={styles.panelNumber}>01</span>

                <div>
                  <h3 className={styles.panelTitle} id="videos-title">
                    Projects in motion
                  </h3>
                  <p className={styles.panelText}>
                    Short videos from completed projects showing quality in
                    every detail.
                  </p>
                </div>

                <div className={styles.videoControls} aria-hidden="true">
                  <button
                    type="button"
                    className={styles.controlButton}
                    onClick={() =>
                      setActiveVideoIndex((current) =>
                        current === 0 ? projectVideos.length - 1 : current - 1,
                      )
                    }
                  >
                    ←
                  </button>

                  <button
                    type="button"
                    className={styles.controlButton}
                    onClick={() =>
                      setActiveVideoIndex((current) =>
                        current === projectVideos.length - 1 ? 0 : current + 1,
                      )
                    }
                  >
                    →
                  </button>
                </div>
              </div>

              <div className={styles.videoStage}>
                <div className={styles.videoGhostLeft} />
                <button type="button" className={styles.videoCard}>
                  <span className={styles.playButton} aria-hidden="true">
                    ▶
                  </span>

                  <span className={styles.videoTitle}>{activeVideo.title}</span>
                  <span className={styles.videoLabel}>{activeVideo.label}</span>
                </button>
                <div className={styles.videoGhostRight} />
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

              <div className={styles.videoBenefits}>
                <span>Real projects</span>
                <span>HD quality</span>
                <span>Real results</span>
              </div>
            </section>

            <section
              className={styles.projectsPanel}
              aria-labelledby="projects-on-site-title"
            >
              <div className={styles.panelHeader}>
                <span className={styles.panelNumber}>02</span>

                <div>
                  <h3 className={styles.panelTitle} id="projects-on-site-title">
                    Projects on the site
                  </h3>
                  <p className={styles.panelText}>
                    Browse all projects on our portfolio page with full
                    information and photos.
                  </p>
                </div>

                <Link href="/projects" className={styles.allProjectsButton}>
                  View all projects
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
                        sizes="(max-width: 767px) 78vw, (max-width: 1199px) 30vw, 260px"
                      />

                      <span className={styles.projectIndex}>
                        {pad(index + 1)}
                      </span>
                    </div>

                    <div className={styles.projectInfo}>
                      <h4 className={styles.projectTitle}>{project.title}</h4>
                      <span className={styles.projectType}>
                        {(project as { category?: string }).category ??
                          "Apartment renovation"}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
