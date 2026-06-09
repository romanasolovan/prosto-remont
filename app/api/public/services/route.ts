import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

export const runtime = "nodejs";

type ServiceItem = {
  id?: string | number;
  name?: string;
  price?: string;
  order?: number | null;
};

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
        items: ((service.items || []) as ServiceItem[])
          .map((item) => ({
            id: String(item.id),
            name: item.name || "",
            price: item.price || "",
            order: item.order ?? 0,
          }))
          .sort((a, b) => a.order - b.order),
        featured: service.featured,
        order: service.order ?? 0,
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
