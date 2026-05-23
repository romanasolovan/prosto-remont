import type { PublicProject } from "@/types/projects";

export async function getProjects(): Promise<PublicProject[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/public/projects`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return [];
  }

  const data = await response.json();

  return data.projects || [];
}
