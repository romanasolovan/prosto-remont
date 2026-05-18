import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

export const runtime = "nodejs";

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
      limit: 12,
    });

    return NextResponse.json({
      success: true,
      reviews: reviews.docs.map((review) => ({
        id: String(review.id),
        name: review.name,
        rating: review.rating,
        comment: review.comment,
        location: review.location,
        date: review.createdAt,
      })),
    });
  } catch (error) {
    console.error("Failed to fetch public reviews:", error);

    return NextResponse.json({ success: false, reviews: [] }, { status: 500 });
  }
}
