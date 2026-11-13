import "server-only";

import { getPayload } from "payload";
import config from "@payload-config";
import { unstable_cache } from "next/cache";
import type { Media, ProjectCategory } from "@/payload-types";
import type { PublicProject } from "@/types/projects";

export type ProjectListingItem = Pick<
  PublicProject,
  | "id"
  | "title"
  | "slug"
  | "categories"
  | "description"
  | "coverImages"
>;

export const getProjectsForListing = unstable_cache(
  async (): Promise<ProjectListingItem[]> => {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "projects",
    where: {
      status: {
        equals: "published",
      },
    },
    sort: "order",
    depth: 1,
    limit: 50,
    select: {
      title: true,
      slug: true,
      description: true,
      categories: true,
      coverImages: true,
    },
  });

  return result.docs.map((project) => ({
    id: String(project.id),
    title: project.title,
    slug: project.slug,
    description: project.description,

    categories: (project.categories ?? [])
      .filter(
        (category): category is ProjectCategory =>
          typeof category === "object" &&
          category !== null,
      )
      .map((category) => ({
        id: String(category.id),
        name: category.name,
        slug: category.slug,
      })),

    coverImages: (project.coverImages ?? [])
      .filter(
        (media): media is Media =>
          typeof media === "object" &&
          media !== null,
      )
      .map((media) => media.url)
      .filter((url): url is string => Boolean(url)),
  }));
}, ["projects-listing"],
  {
    revalidate: 60,
    tags: ["projects-listing"],
  },
);
