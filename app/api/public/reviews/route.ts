import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Media } from "@/payload-types";

export const runtime = "nodejs";

type PublicVideo = {
  url: string;
  mimeType: "video/mp4" | "video/webm";
  filesize: number | null;
  filename: string | null;
};

const getMediaUrl = (media?: number | Media | null) => {
  if (!media || typeof media !== "object" || !media.url) {
    return undefined;
  }

  return media.url;
};

const getPublicVideo = (
  media?: number | Media | null,
): PublicVideo | undefined => {
  if (!media || typeof media !== "object" || !media.url) {
    return undefined;
  }

  if (media.mimeType !== "video/mp4" && media.mimeType !== "video/webm") {
    return undefined;
  }

  return {
    url: media.url,
    mimeType: media.mimeType,
    filesize: media.filesize ?? null,
    filename: media.filename ?? null,
  };
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
        video: getPublicVideo(review.video),
        googleReviewUrl: review.googleReviewUrl ?? undefined,
      })),
    });
  } catch (error) {
    console.error("Failed to fetch public reviews:", error);

    return NextResponse.json({ success: false, reviews: [] }, { status: 500 });
  }
}
