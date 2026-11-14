import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import type { PublicProject } from "@/types/projects";
import ProjectCardCarousel from "@/components/Projects/ProjectCardCarousel/ProjectCardCarousel";
import styles from "./ProjectGalleryPreview.module.css";

type ProjectGalleryPreviewProps = {
  projects: PublicProject[];
};

const pad = (value: number) => String(value).padStart(2, "0");

export default function ProjectGalleryPreview({
  projects,
}: ProjectGalleryPreviewProps) {
  const t = useTranslations("home.projectsPreview.gallery");

  return (
    <section
      className={styles.projectsPanel}
      aria-label={t("title")}
    >
      <div className={styles.panelHeader}>
        <span className={styles.panelNumber}>02</span>
        <h3 className={styles.panelTitle}>{t("title")}</h3>
      </div>

      <div className={styles.projectsGrid}>
        {projects.map((project, index) => (
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

              <span
                className={styles.projectArrow}
                aria-hidden="true"
              >
                →
              </span>
            </div>

            <div className={styles.projectInfo}>
              <h4 className={styles.projectTitle}>
                {project.title}
              </h4>

              {project.categories[0] && (
                <span className={styles.projectType}>
                  {project.categories[0].name}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}