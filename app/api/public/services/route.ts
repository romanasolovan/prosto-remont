import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

export const runtime = "nodejs";

export async function GET() {
  try {
    const payload = await getPayload({ config });

    const services = await payload.find({
      collection: "services",
      where: {
        status: {
          equals: "published",
        },
      },
      sort: "order",
      limit: 50,
    });

    return NextResponse.json({
      success: true,

      services: services.docs.map((service) => ({
        id: String(service.id),

        title: service.title,
        slug: service.slug,
        category: service.category,

        shortDescription: service.shortDescription,
        fullDescription: service.fullDescription,

        price: service.price,
        abbr: service.abbr,

        specs: service.specs || [],
        steps: service.steps || [],

        featured: service.featured,
      })),
    });
  } catch (error) {
    console.error("Failed to fetch services:", error);

    return NextResponse.json(
      {
        success: false,
        services: [],
      },
      { status: 500 },
    );
  }
}
