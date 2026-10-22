
import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

import type {
  Media,
  ProjectCategory,
} from "@/payload-types";

export const runtime = "nodejs";

const getMediaUrls = (items?: (number | Media)[] | null): string[] => {
  if (!items) return [];

  return items
    .filter(
      (item): item is Media =>
        typeof item === "object" && item !== null,
    )
    .map((item) => item.url)
    .filter((url): url is string => Boolean(url));
};

const getProjectCategories = (
  items?: (number | ProjectCategory)[] | null,
) => {
  if (!items) return [];

  return items
    .filter(
      (item): item is ProjectCategory =>
        typeof item === "object" && item !== null,
    )
    .map((category) => ({
      id: String(category.id),
      name: category.name,
      slug: category.slug,
    }));
};

export async function GET() {
  try {
    const payload = await getPayload({ config });

    const projects = await payload.find({
      collection: "projects",
      where: {
        status: {
          equals: "published",
        },
      },
      sort: "order",
      depth: 2,
      limit: 50,
    });

    return NextResponse.json({
      success: true,
      projects: projects.docs.map((project) => ({
        id: String(project.id),
        title: project.title,
        slug: project.slug,
        category: project.category,
        categories: getProjectCategories(project.categories),
        description: project.description,
        coverImages: getMediaUrls(project.coverImages),
        galleryImages: getMediaUrls(project.galleryImages),
        featured: project.featured,
      })),
    });
  } catch (error) {
    console.error("Failed to fetch projects:", error);

    return NextResponse.json(
      {
        success: false,
        projects: [],
      },
      { status: 500 },
    );
  }
}
