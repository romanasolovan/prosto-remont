import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Media } from "@/payload-types";

export const runtime = "nodejs";

export async function GET() {
  try {
    const payload = await getPayload({ config });

    const brands = await payload.find({
      collection: "trusted-brands",
      where: {
        status: {
          equals: "published",
        },
      },
      sort: "order",
      depth: 2,
      limit: 50,
    });

    return NextResponse.json({
      success: true,
      brands: brands.docs.map((brand) => {
        const logo =
          typeof brand.logo === "object" && brand.logo !== null
            ? (brand.logo as Media)
            : null;

        return {
          id: String(brand.id),
          name: brand.name,
          mark: brand.mark || brand.name.slice(0, 2).toUpperCase(),
          logoSrc: logo?.url || "",
          logoAlt: logo?.alt || `${brand.name} logo`,
          href: brand.href || "",
        };
      }),
    });
  } catch (error) {
    console.error("Failed to fetch trusted brands:", error);

    return NextResponse.json({ success: false, brands: [] }, { status: 500 });
  }
}
