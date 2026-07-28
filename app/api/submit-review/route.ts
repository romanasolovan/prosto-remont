import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
// import { translateReview } from "@/lib/translate-review";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const payload = await getPayload({ config });

    let photoId: number | undefined;

    const photo = formData.get("photo");

    if (photo instanceof File && photo.size > 0) {
      const arrayBuffer = await photo.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadedPhoto = await payload.create({
        collection: "media",
        data: {
          alt: String(formData.get("name") || "Review photo"),
        },
        file: {
          data: buffer,
          mimetype: photo.type,
          name: photo.name,
          size: photo.size,
        },
      });

      photoId = uploadedPhoto.id;
    }

    const originalComment = String(formData.get("comment") || "");

    // let translations:
    //   | {
    //       en: string;
    //       pl: string;
    //       uk: string;
    //       ru: string;
    //     }
    //   | undefined;

    // try {
    //   translations = await translateReview(originalComment);
    // } catch (error) {
    //   console.error("Review translation failed:", error);
    // }

    // const translations = await translateReview(originalComment);

    const review = await payload.create({
  collection: "reviews",
  draft: false,
  data: {
    name: String(formData.get("name") || ""),
    location: String(formData.get("location") || ""),
    rating: Number(formData.get("rating") || 0),
    comment: originalComment,
    originalLanguage: "en",
    videoSource: "none",
    status: "pending",
    featured: false,
    ...(photoId !== undefined ? { photo: photoId } : {}),
  },
});

    return NextResponse.json(
      {
        success: true,
        id: review.id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Review submission failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Review submission failed.",
      },
      { status: 500 },
    );
  }
}