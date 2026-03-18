import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import styles from "./ProjectsPreview.module.css";

export default function ProjectsPreview() {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");

  const projects = [
    {
      number: "01",
      title: "Private Apartment",
      description:
        "A refined interior direction shaped around light, layout, and daily flow.",
    },
    {
      number: "02",
      title: "Family House",
      description:
        "A renovation approach focused on warmth, function, and long-term comfort.",
    },
    {
      number: "03",
      title: "Commercial Space",
      description:
        "A clear visual identity supported by practical planning and spatial clarity.",
    },
  ];

  return (
    <section className={styles.projectsPreview} id="projects">
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.content}>
            <span className={styles.label}>{t("labels.projects")}</span>
            <h2 className={styles.title}>{t("projects.title")}</h2>
            <p className={styles.description}>{t("projects.description")}</p>

            <Link href="/projects" className={styles.link}>
              {tCommon("viewPortfolio")}
              <span className={styles.linkArrow} aria-hidden="true">
                →
              </span>
            </Link>
          </div>

          <div className={styles.layout}>
            <article className={styles.featuredCard} aria-hidden="true">
              <div className={styles.featuredFrameOuter}>
                <div className={styles.featuredFrameInner} />
              </div>
              <span className={styles.featuredNumber}>01</span>
            </article>

            <div className={styles.sideGrid}>
              {projects.slice(1).map((project) => (
                <article key={project.number} className={styles.projectCard}>
                  <span className={styles.projectNumber}>{project.number}</span>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectDescription}>
                    {project.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
