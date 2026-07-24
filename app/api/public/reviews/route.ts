import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

import type { Media, Review } from "@/payload-types";
import type { PublicReviewVideo } from "@/components/Reviews/shared/types";

export const runtime = "nodejs";

const getMediaUrl = (
  media?: number | Media | null,
): string | undefined => {
  if (!media || typeof media !== "object" || !media.url) {
    return undefined;
  }

  return media.url;
};

const getUploadedReviewVideo = (
  media?: number | Media | null,
): PublicReviewVideo | undefined => {
  if (!media || typeof media !== "object" || !media.url) {
    return undefined;
  }

  if (media.mimeType !== "video/mp4" && media.mimeType !== "video/webm") {
    return undefined;
  }

  return {
    source: "upload",
    url: media.url,
    mimeType: media.mimeType,
    filesize: media.filesize ?? null,
    filename: media.filename ?? null,
  };
};

const getInstagramReviewVideo = ({
  instagramUrl,
  instagramPoster,
}: {
  instagramUrl?: string | null;
  instagramPoster?: number | Media | null;
}): PublicReviewVideo | undefined => {
  const trimmedUrl = instagramUrl?.trim();
  const posterUrl = getMediaUrl(instagramPoster);

  if (!trimmedUrl || !posterUrl) {
    return undefined;
  }

  return {
    source: "instagram",
    url: trimmedUrl,
    posterUrl,
  };
};

const getPublicReviewVideo = (
  review: Review,
): PublicReviewVideo | undefined => {
  if (review.videoSource === "instagram") {
  return getInstagramReviewVideo({
    instagramUrl: review.instagramUrl,
    instagramPoster: review.instagramPoster,
  });
}

  if (review.videoSource === "upload") {
    return getUploadedReviewVideo(review.video);
  }

  /*
   * Legacy fallback:
   * Older reviews may contain an uploaded video but may not yet have been
   * saved after videoSource was introduced.
   */
  return getUploadedReviewVideo(review.video);
};

export async function GET() {
  try {
    const payload = await getPayload({ config });

    const reviews = await payload.find({
      collection: "reviews",
      where: {
        status: {
          equals: "approved",
        },
      },
      sort: "-createdAt",
      depth: 1,
      limit: 12,
    });

    return NextResponse.json({
      success: true,
      reviews: reviews.docs.map((review) => ({
        id: String(review.id),
        name: review.name,
        rating: review.rating,
        comment: review.comment,
        translations: review.translations,
        location: review.location,
        date: review.createdAt,
        photoUrl: getMediaUrl(review.photo),
        video: getPublicReviewVideo(review),
        googleReviewUrl: review.googleReviewUrl?.trim() || undefined,
      })),
    });
  } catch (error) {
    console.error("Failed to fetch public reviews:", error);

    return NextResponse.json(
      {
        success: false,
        reviews: [],
      },
      {
        status: 500,
      },
    );
  }
}