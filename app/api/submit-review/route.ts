import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

export const runtime = "nodejs";

const NAME_MIN = 2;
const NAME_MAX = 50;
const COMMENT_MIN = 10;
const COMMENT_MAX = 500;

const MAX_PHOTO_SIZE_BYTES = 5 * 1024 * 1024;

const ACCEPTED_PHOTO_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

function getTextField(
  formData: FormData,
  field: string,
): string {
  const value = formData.get(field);

  return typeof value === "string"
    ? value.trim()
    : "";
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = getTextField(formData, "name");
    const location = getTextField(
      formData,
      "location",
    );
    const comment = getTextField(
      formData,
      "comment",
    );
    const ratingValue = getTextField(
      formData,
      "rating",
    );

    const rating = Number(ratingValue);

    if (
      name.length < NAME_MIN ||
      name.length > NAME_MAX
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid name.",
        },
        { status: 400 },
      );
    }

    if (location.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Location is required.",
        },
        { status: 400 },
      );
    }

    if (
      comment.length < COMMENT_MIN ||
      comment.length > COMMENT_MAX
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid comment.",
        },
        { status: 400 },
      );
    }

    if (
      !Number.isInteger(rating) ||
      rating < 1 ||
      rating > 5
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid rating.",
        },
        { status: 400 },
      );
    }

    const photo = formData.get("photo");

    if (
      photo !== null &&
      !(photo instanceof File)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid photo.",
        },
        { status: 400 },
      );
    }

    if (
      photo instanceof File &&
      photo.size > 0
    ) {
      if (
        !ACCEPTED_PHOTO_TYPES.has(photo.type)
      ) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid photo type.",
          },
          { status: 400 },
        );
      }

      if (photo.size > MAX_PHOTO_SIZE_BYTES) {
        return NextResponse.json(
          {
            success: false,
            message: "Photo is too large.",
          },
          { status: 400 },
        );
      }
    }

    const payload = await getPayload({
      config,
    });

    let photoId: number | undefined;

    if (
      photo instanceof File &&
      photo.size > 0
    ) {
      const arrayBuffer =
        await photo.arrayBuffer();

      const buffer = Buffer.from(
        arrayBuffer,
      );

      const uploadedPhoto =
        await payload.create({
          collection: "media",
          data: {
            alt: `${name} review photo`,
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
      draft: false,
      data: {
        reviewType: "written",
        name,
        location,
        rating,
        comment,
        originalLanguage: "en",
        status: "pending",
        featured: false,
        ...(photoId !== undefined
          ? { photo: photoId }
          : {}),
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
    console.error(
      "Review submission failed:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message: "Review submission failed.",
      },
      { status: 500 },
    );
  }
}