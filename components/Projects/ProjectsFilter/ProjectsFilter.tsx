"use client";

import { useLayoutEffect, useRef, useState } from "react";

import ProjectCard from "@/components/Projects/ProjectCard/ProjectCard";
import type {
  PublicProject,
  PublicProjectCategory,
} from "@/types/projects";

import styles from "./ProjectsFilter.module.css";

type ProjectsFilterProps = {
  locale: string;
  projects: PublicProject[];
  categories: PublicProjectCategory[];
  allLabel: string;
  emptyLabel: string;
};

export default function ProjectsFilter({
  locale,
  projects,
  categories,
  allLabel,
  emptyLabel,
}: ProjectsFilterProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const navigationRef = useRef<HTMLElement>(null);
  const previousTopRef = useRef<number | null>(null);

  const filteredProjects = activeCategory
    ? projects.filter((project) =>
        project.categories.some(
          (category) => category.slug === activeCategory,
        ),
      )
    : projects;

  function selectCategory(category: string | null) {
    if (category === activeCategory) return;

    previousTopRef.current =
      navigationRef.current?.getBoundingClientRect().top ?? null;

    setActiveCategory(category);
  }

  useLayoutEffect(() => {
    const previousTop = previousTopRef.current;

    if (previousTop === null) return;

    previousTopRef.current = null;

    const currentTop = navigationRef.current?.getBoundingClientRect().top;

    if (currentTop === undefined) return;

    const difference = currentTop - previousTop;

    if (Math.abs(difference) > 1) {
      window.scrollBy({
        top: difference,
        behavior: "instant",
      });
    }
  }, [activeCategory]);

  return (
    <>
      <nav
        ref={navigationRef}
        className={styles.categoryNav}
        aria-label={allLabel}
      >
        <div className={styles.categoryList}>
          <button
            type="button"
            className={`${styles.categoryButton} ${
              activeCategory === null ? styles.categoryActive : ""
            }`}
            aria-pressed={activeCategory === null}
            onClick={() => selectCategory(null)}
          >
            {allLabel}
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={`${styles.categoryButton} ${
                activeCategory === category.slug ? styles.categoryActive : ""
              }`}
              aria-pressed={activeCategory === category.slug}
              onClick={() => selectCategory(category.slug)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </nav>

      {filteredProjects.length > 0 ? (
        <div className={styles.projectsList}>
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              locale={locale}
              slug={project.slug}
              title={project.title}
              category={project.categories[0]?.name ?? ""}
              description={project.description}
              images={project.coverImages}
              index={index}
              isReversed={index % 2 !== 0}
            />
          ))}
        </div>
      ) : (
        <p className={styles.emptyState} role="status">
          {emptyLabel}
        </p>
      )}
    </>
  );
}
