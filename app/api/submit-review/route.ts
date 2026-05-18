import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

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

    const review = await payload.create({
      collection: "reviews",
      data: {
        name: String(formData.get("name") || ""),
        location: String(formData.get("location") || ""),
        rating: Number(formData.get("rating") || 0),
        comment: String(formData.get("comment") || ""),
        originalLanguage: "en",
        photo: photoId,
        status: "pending",
        featured: false,
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
