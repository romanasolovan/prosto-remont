import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

import type {
  Media,
  Project,
  ProjectCategory,
} from "@/payload-types";

import type {
  PublicProjectGallerySection,
  PublicProjectMediaItem,
} from "@/types/projects";

export const runtime = "nodejs";

const getMediaUrls = (
  items?: (number | Media)[] | null,
): string[] => {
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

const getMedia = (
  value: number | Media | null | undefined,
): Media | null => {
  return typeof value === "object" && value !== null
    ? value
    : null;
};

const getGallerySections = (
  sections: Project["gallerySections"],
): PublicProjectGallerySection[] => {
  if (!sections) return [];

  return sections.map((section) => {
    const mediaItems: PublicProjectMediaItem[] = [];

    for (const item of section.mediaItems ?? []) {
      const media = getMedia(item.media);

      if (!media?.url) continue;

      const mimeType = media.mimeType ?? "";
      const isImage = mimeType.startsWith("image/");
      const isVideo = mimeType.startsWith("video/");

      if (!isImage && !isVideo) continue;

      const poster = getMedia(item.poster);

      mediaItems.push({
        id: String(item.id ?? media.id),
        type: isVideo ? "video" : "image",
        url: media.url,
        posterUrl: poster?.url ?? null,
        caption: item.caption ?? null,
        sourceUrl: item.sourceUrl ?? null,
      });
    }

    return {
      id: String(section.id ?? section.slug),
      title: section.title,
      slug: section.slug,
      description: section.description ?? null,
      mediaItems,
    };
  });
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
        categories: getProjectCategories(project.categories),
        description: project.description,
        coverImages: getMediaUrls(project.coverImages),
        galleryImages: getMediaUrls(project.galleryImages),
        gallerySections: getGallerySections(project.gallerySections),
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
