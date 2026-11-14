"use client";

import { useEffect, useState } from "react";

import DataLoader from "@/components/ui/DataLoader/DataLoader";
import ProjectsFilter from "@/components/Projects/ProjectsFilter/ProjectsFilter";

import type { PublicProjectCategory } from "@/types/projects";
import type { ProjectListingItem } from "@/lib/getProjectsForListing";

type ProjectsListingProps = {
  locale: string;
  allLabel: string;
  emptyLabel: string;
  loadingLabel: string;
  errorLabel: string;
};

type ProjectsListingResponse = {
  success: boolean;
  projects: ProjectListingItem[];
  categories: PublicProjectCategory[];
};

export default function ProjectsListing({
  locale,
  allLabel,
  emptyLabel,
  loadingLabel,
  errorLabel,
}: ProjectsListingProps) {
  const [projects, setProjects] = useState<ProjectListingItem[]>([]);
  const [categories, setCategories] = useState<
    PublicProjectCategory[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProjects = async () => {
      setIsLoading(true);
      setHasError(false);

      try {
        const response = await fetch("/api/public/projects-listing", {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch projects listing: ${response.status}`,
          );
        }

        const data: ProjectsListingResponse = await response.json();

        if (
          !data.success ||
          !Array.isArray(data.projects) ||
          !Array.isArray(data.categories)
        ) {
          throw new Error("Invalid projects listing response");
        }

        if (!controller.signal.aborted) {
          setProjects(data.projects);
          setCategories(data.categories);
        }
      } catch (error) {
        if (controller.signal.aborted) return;

        console.error("Failed to load projects listing:", error);
        setHasError(true);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    void fetchProjects();

    return () => controller.abort();
  }, []);

  if (isLoading) {
    return <DataLoader label={loadingLabel} />;
  }

  if (hasError) {
    return <p role="alert">{errorLabel}</p>;
  }

  return (
    <ProjectsFilter
      locale={locale}
      projects={projects}
      categories={categories}
      allLabel={allLabel}
      emptyLabel={emptyLabel}
    />
  );
}
