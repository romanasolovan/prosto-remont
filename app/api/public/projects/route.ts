import { NextResponse } from "next/server";

import { getProjects } from "@/lib/getProjects";

export const runtime = "nodejs";

export async function GET() {
  try {
    const projects = await getProjects();

    return NextResponse.json({
      success: true,
      projects,
    });
  } catch (error) {
    console.error("Failed to fetch projects:", error);

    return NextResponse.json(
      {
        success: false,
        projects: [],
      },
      { status: 500 },
    );
  }
}
