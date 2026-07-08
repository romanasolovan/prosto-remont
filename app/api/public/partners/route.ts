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

    const partners = await payload.find({
      collection: "partners",
      where: {
        status: {
          equals: "active",
        },
      },
      sort: "order",
      depth: 1,
      limit: 50,
    });

    return NextResponse.json({
      success: true,
      partners: partners.docs.map((partner) => ({
        id: String(partner.id),
        name: partner.name,
        logoUrl: getMediaUrl(partner.logo),
        href: partner.website || undefined,
      })),
    });
  } catch (error) {
    console.error("Failed to fetch partners:", error);

    return NextResponse.json(
      {
        success: false,
        partners: [],
      },
      { status: 500 },
    );
  }
}
