import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { projects } from "@/data/projects";
import ProjectCardCarousel from "@/components/Projects/ProjectCardCarousel/ProjectCardCarousel";
import styles from "./ProjectsPreview.module.css";

export default function ProjectsPreview() {
  const t = useTranslations("home");
  const tProjects = useTranslations("projects.preview");
  const tCommon = useTranslations("common");

  const previewProjects = projects.slice(0, 2);

  return (
    <section className={styles.projectsPreview} id="projects">
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.content}>
            <span className={styles.label}>{t("labels.projects")}</span>
            <h2 className={styles.title}>{tProjects("title")}</h2>
            <p className={styles.description}>{tProjects("description")}</p>
          </div>

          <div className={styles.previewList}>
            {previewProjects.map((project, index) => (
              <article key={project.slug} className={styles.previewCard}>
                <div className={styles.cardFrame}>
                  <div className={styles.cardMedia}>
                    <ProjectCardCarousel
                      images={project.coverImages}
                      alt={project.title}
                      mobileImagesPerPage={1}
                      desktopImagesPerPage={1}
                      sizes="(max-width: 899px) 100vw, 50vw"
                    />
                  </div>

                  <div className={styles.cardContent}>
                    <span className={styles.cardCategory}>
                      {tProjects(`categories.${project.category}`)}
                    </span>

                    <h3 className={styles.cardTitle}>{project.title}</h3>
                    <p className={styles.cardText}>{project.description}</p>
                  </div>

                  <span className={styles.cardIndex} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <Link
                    href={`/projects/${project.slug}`}
                    className={styles.cardLink}
                    aria-label={`View project: ${project.title}`}
                  />
                </div>
              </article>
            ))}
          </div>

          <Link href="/projects" className={styles.link}>
            {tCommon("viewPortfolio")}
            <span className={styles.linkArrow} aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
