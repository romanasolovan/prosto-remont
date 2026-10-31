import Link from "next/link";

import ProjectCardCarousel from "../ProjectCardCarousel/ProjectCardCarousel";
import styles from "./ProjectCard.module.css";

type ProjectCardProps = {
  locale: string;
  slug: string;
  title: string;
  categories: {
    id: string | number;
    name: string;
  }[];
  description: string;
  images: string[];
  index: number;
  isReversed: boolean;
};

export default function ProjectCard({
  locale,
  slug,
  title,
  categories,
  description,
  images,
  index,
  isReversed,
}: ProjectCardProps) {
  const projectHref = `/${locale}/projects/${slug}`;

  return (
    <article
      className={`${styles.projectRow} ${
        isReversed ? styles.rowRight : styles.rowLeft
      }`}
    >
      <div className={styles.projectFrame}>
        <Link
  href={projectHref}
  className={styles.projectLink}
  aria-label={title}
/>
        <div className={styles.projectMedia}>
          {images.length > 0 ? (
            <ProjectCardCarousel images={images} alt={title} />
          ) : (
            <div className={styles.projectImage} />
          )}
        </div>

        <div className={styles.projectContent}>
          <span className={styles.projectIndex} aria-hidden="true">
            {(index + 1).toString().padStart(2, "0")}
          </span>

          {categories.length > 0 && (
            <div className={styles.projectCategories}>
              {categories.map((category) => (
                <span
                  key={category.id}
                  className={styles.projectCategory}
                >
                  {category.name}
                </span>
              ))}
            </div>
          )}

          <h3 className={styles.projectTitle}>{title}</h3>

          <p className={styles.projectText}>{description}</p>
        </div>
      </div>
    </article>
  );
}

