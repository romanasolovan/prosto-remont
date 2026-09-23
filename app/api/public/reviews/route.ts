import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

import type { Media } from "@/payload-types";
import type {
  PublicReview,
  PublicUploadedReviewVideo,
} from "@/components/Reviews/shared/types";

export const runtime = "nodejs";

const getMediaUrl = (
  media?: number | Media | null,
): string | undefined => {
  if (
    !media ||
    typeof media !== "object" ||
    !media.url
  ) {
    return undefined;
  }

  return media.url;
};

const getUploadedReviewVideo = (
  media?: number | Media | null,
): PublicUploadedReviewVideo | undefined => {
  if (
    !media ||
    typeof media !== "object" ||
    !media.url
  ) {
    return undefined;
  }

  if (
    media.mimeType !== "video/mp4" &&
    media.mimeType !== "video/webm"
  ) {
    return undefined;
  }

  return {
    url: media.url,
    mimeType: media.mimeType,
    filesize: media.filesize ?? null,
    filename: media.filename ?? null,
  };
};

const getOptionalText = (
  value?: string | null,
): string | undefined => {
  const trimmedValue = value?.trim();

  return trimmedValue || undefined;
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

    const publicReviews: PublicReview[] =
      reviews.docs.map((review) => ({
        id: String(review.id),
        reviewType: review.reviewType,
        name: review.name,
        rating: review.rating,
        comment: getOptionalText(review.comment),
        translations: review.translations,
        location: review.location,
        date: review.createdAt,
        photoUrl: getMediaUrl(review.photo),
        googleReviewUrl: getOptionalText(
          review.googleReviewUrl,
        ),
        video: getUploadedReviewVideo(review.video),
        videoCardImageUrl: getMediaUrl(
          review.videoCardImage,
        ),
        videoSourceUrl: getOptionalText(
          review.videoSourceUrl,
        ),
        videoNote: getOptionalText(
          review.videoNote,
        ),
      }));

    return NextResponse.json({
      success: true,
      reviews: publicReviews,
    });
  } catch (error) {
    console.error(
      "Failed to fetch public reviews:",
      error,
    );

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