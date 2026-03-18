import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import styles from "./ProjectsPreview.module.css";

export default function ProjectsPreview() {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");

  const projects = [
    {
      number: "02",
      title: "Family House",
      description:
        "A renovation approach centered on warmth, function, and long-term comfort for everyday living.",
    },
    {
      number: "03",
      title: "Commercial Space",
      description:
        "A clearer visual identity supported by practical planning, atmosphere, and spatial balance.",
    },
  ];

  return (
    <section className={styles.projectsPreview} id="projects">
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.content}>
            <span className={styles.label}>{t("labels.projects")}</span>

            <h2 className={styles.title}>
              Selected work that reflects clarity, atmosphere, and careful
              execution
            </h2>

            <p className={styles.description}>
              Projects should show more than surface appeal. They should reflect
              proportion, intention, and the quality of decisions behind the
              finished result.
            </p>

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

              <div className={styles.featuredMeta}>
                <span className={styles.featuredMetaNumber}>01</span>
                <span className={styles.featuredMetaLabel}>
                  Private Apartment
                </span>
              </div>

              <span className={styles.featuredNumber}>01</span>
            </article>

            <div className={styles.sideGrid}>
              {projects.map((project) => (
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
