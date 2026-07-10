import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Media } from "@/payload-types";

export const runtime = "nodejs";

const getMediaUrl = (media?: number | Media | null) => {
  if (!media || typeof media !== "object") {
    return undefined;
  }

  return media.url || undefined;
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
        videoUrl: getMediaUrl(review.video),
      })),
    });
  } catch (error) {
    console.error("Failed to fetch public reviews:", error);

    return NextResponse.json({ success: false, reviews: [] }, { status: 500 });
  }
}
