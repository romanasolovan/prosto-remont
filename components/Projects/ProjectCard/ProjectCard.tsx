import Link from "next/link";
import styles from "./ProjectCard.module.css";
import ProjectCardCarousel from "../ProjectCardCarousel/ProjectCardCarousel";

type ProjectCardProps = {
  locale: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  images: string[];
  index: number;
  isReversed: boolean;
};

export default function ProjectCard({
  locale,
  slug,
  title,
  category,
  description,
  images,
  index,
  isReversed,
}: ProjectCardProps) {
  return (
    <article
      className={`${styles.projectRow} ${
        isReversed ? styles.rowRight : styles.rowLeft
      }`}
    >
      <Link href={`/${locale}/projects/${slug}`} className={styles.projectLink}>
        <div className={styles.projectFrame}>
          <div className={styles.projectMedia}>
            {images.length > 0 ? (
              <ProjectCardCarousel images={images} alt={title} />
            ) : (
              <div className={styles.projectImage} />
            )}

            <span className={styles.projectIndex}>
              {(index + 1).toString().padStart(2, "0")}
            </span>
          </div>

          <div className={styles.projectContent}>
            <div className={styles.projectPlaque}>
              <span className={styles.projectCategory}>{category}</span>
            </div>

            <h3 className={styles.projectTitle}>{title}</h3>

            <p className={styles.projectText}>{description}</p>
          </div>

          <span className={styles.projectAccent} aria-hidden="true" />
        </div>
      </Link>
    </article>
  );
}
