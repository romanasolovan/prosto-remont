import { getProjects } from "@/lib/getProjects";
import type { PublicProject } from "@/types/projects";

export async function getProjectBySlug(
  slug: string,
): Promise<PublicProject | null> {
  const projects: PublicProject[] = await getProjects();

  return projects.find((project) => project.slug === slug) || null;
}
