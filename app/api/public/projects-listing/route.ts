
import { NextResponse } from "next/server";

import { getProjectCategories } from "@/lib/getProjectCategories";
import { getProjectsForListing } from "@/lib/getProjectsForListing";

export const runtime = "nodejs";

export async function GET() {
  try {
    const [projects, categories] = await Promise.all([
      getProjectsForListing(),
      getProjectCategories(),
    ]);

    return NextResponse.json({
      success: true,
      projects,
      categories,
    });
  } catch (error) {
    console.error("Failed to fetch projects listing:", error);

    return NextResponse.json(
      {
        success: false,
        projects: [],
        categories: [],
      },
      { status: 500 },
    );
  }
}
