
import { APIError } from "payload";
import type { CollectionBeforeValidateHook } from "payload";

import type { Media } from "@/payload-types";

type GalleryMediaItem = {
  media?: number | Media | null;
  poster?: number | Media | null;
};

type GallerySection = {
  title?: string | null;
  slug?: string | null;
  mediaItems?: GalleryMediaItem[] | null;
};

const getMediaId = (value: number | Media | null | undefined) => {
  if (typeof value === "number") {
    return value;
  }

  return value?.id ?? null;
};

export const validateProjectGallery: CollectionBeforeValidateHook =
  async ({ data, req }) => {
    if (!data?.gallerySections) {
      return data;
    }

    const sections = data.gallerySections as GallerySection[];

    if (!Array.isArray(sections)) {
      return data;
    }

    const sectionSlugs = new Set<string>();

    for (const section of sections) {
      const slug = section.slug?.trim();

      if (slug) {
        if (sectionSlugs.has(slug)) {
          throw new APIError(
            `Gallery section slug "${slug}" is duplicated. Each section must have a unique slug.`,
            400,
          );
        }

        sectionSlugs.add(slug);
      }

      for (const item of section.mediaItems ?? []) {
        const mediaId = getMediaId(item.media);

        if (mediaId === null) {
          continue;
        }

        const media = await req.payload.findByID({
          collection: "media",
          id: mediaId,
          depth: 0,
          req,
        });

        const mimeType = media.mimeType ?? "";

        if (!mimeType.startsWith("video/")) {
          continue;
        }

        const posterId = getMediaId(item.poster);

        if (posterId === null) {
          throw new APIError(
            `A video in gallery section "${section.title ?? slug ?? "Untitled"}" requires a thumbnail image.`,
            400,
          );
        }

        const poster = await req.payload.findByID({
          collection: "media",
          id: posterId,
          depth: 0,
          req,
        });

        if (!poster.mimeType?.startsWith("image/")) {
          throw new APIError(
            "Video thumbnails must be image files.",
            400,
          );
        }
      }
    }

    return data;
  };
