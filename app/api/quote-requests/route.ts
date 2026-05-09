import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const payload = await getPayload({ config });

    const uploadedMediaIds: string[] = [];

    const files = formData.getAll("attachments");

    for (const file of files) {
      if (!(file instanceof File) || file.size === 0) continue;

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadedFile = await payload.create({
        collection: "media",
        data: {
          alt: file.name,
        },
        file: {
          data: buffer,
          mimetype: file.type,
          name: file.name,
          size: file.size,
        },
      });

      uploadedMediaIds.push(String(uploadedFile.id));
    }

    const quoteRequest = await payload.create({
      collections: "quote-requests",
      data: {
        fullName: String(formData.get("fullName") || ""),
        phone: String(formData.get("phone") || ""),
        email: String(formData.get("email") || ""),
        interestedIn: String(formData.get("interestedIn") || ""),
        renovationType: String(formData.get("renovationType") || ""),
        renovationObject: String(formData.get("renovationObject") || ""),
        workDescription: String(formData.get("workDescription") || ""),
        attachments: uploadedMediaIds,
        startDate: String(formData.get("startDate") || ""),
        location: String(formData.get("location") || ""),
        additionalComments: String(formData.get("additionalComments") || ""),
        status: "new",
      },
    });

    return NextResponse.json(
      {
        success: true,
        id: quoteRequest.id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Quote request submission failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Quote request submission failed.",
      },
      { status: 500 },
    );
  }
}
