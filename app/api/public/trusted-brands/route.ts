import { NextResponse } from "next/server";
import { getPayload } from "payload";

import config from "@payload-config";

import type { Media, Project } from "@/payload-types";

export const runtime = "nodejs";

type PublicMedia = {
  src: string;
  alt: string;
};

type PublicFeaturedProject = {
  id: string;
  title: string;
  slug: string;
  previewImage: PublicMedia | null;
};

const getPopulatedMedia = (
  media: number | Media | null | undefined,
): Media | null => {
  if (!media || typeof media !== "object") {
    return null;
  }

  return media;
};

const getPopulatedProject = (
  project: number | Project | null | undefined,
): Project | null => {
  if (!project || typeof project !== "object") {
    return null;
  }

  return project;
};

const getPublicMedia = (
  media: number | Media | null | undefined,
  fallbackAlt: string,
): PublicMedia | null => {
  const populatedMedia = getPopulatedMedia(media);

  if (!populatedMedia?.url) {
    return null;
  }

  return {
    src: populatedMedia.url,
    alt: populatedMedia.alt || fallbackAlt,
  };
};

const getFirstProjectCoverImage = (
  project: Project | null,
): number | Media | null => {
  if (!project?.coverImages?.length) {
    return null;
  }

  return project.coverImages[0] ?? null;
};

export async function GET() {
  try {
    const payload = await getPayload({ config });

    const brands = await payload.find({
      collection: "trusted-brands",
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

      brands: brands.docs.map((brand) => {
        const logo = getPublicMedia(
          brand.logo,
          `${brand.name} logo`,
        );

        const featuredProject = getPopulatedProject(
          brand.featuredProject,
        );

        const customProjectPreview = getPublicMedia(
          brand.projectPreviewImage,
          featuredProject
            ? `${featuredProject.title} project`
            : `${brand.name} project`,
        );

        const fallbackProjectPreview = getPublicMedia(
          getFirstProjectCoverImage(featuredProject),
          featuredProject
            ? `${featuredProject.title} project`
            : `${brand.name} project`,
        );

        const projectPreview =
          customProjectPreview ?? fallbackProjectPreview;

        const publicFeaturedProject: PublicFeaturedProject | null =
          featuredProject
            ? {
                id: String(featuredProject.id),
                title: featuredProject.title,
                slug: featuredProject.slug,
                previewImage: projectPreview,
              }
            : null;

        return {
          id: String(brand.id),
          name: brand.name,
          mark:
            brand.mark?.trim() ||
            brand.name.slice(0, 2).toUpperCase(),

          logoSrc: logo?.src || "",
          logoAlt: logo?.alt || `${brand.name} logo`,

          /*
           * Kept unchanged for compatibility with the current
           * TrustedBrands frontend component.
           */
          href: brand.href?.trim() || "",

          description: {
            pl: brand.description?.pl?.trim() || "",
            en: brand.description?.en?.trim() || "",
            uk: brand.description?.uk?.trim() || "",
            ru: brand.description?.ru?.trim() || "",
          },

          website: brand.website?.trim() || "",
          featuredProject: publicFeaturedProject,
        };
      }),
    });
  } catch (error) {
    console.error("Failed to fetch trusted brands:", error);

    return NextResponse.json(
      {
        success: false,
        brands: [],
      },
      {
        status: 500,
      },
    );
  }
}