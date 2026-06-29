import type { PublicProject } from "@/types/projects";

export async function getProjects(): Promise<PublicProject[]> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
    ? process.env.NEXT_PUBLIC_SITE_URL
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

  try {
    const response = await fetch(`${siteUrl}/api/public/projects`, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Failed to fetch projects:", response.status);
      return [];
    }

    const data = await response.json();

    return data.projects || [];
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return [];
  }
}
