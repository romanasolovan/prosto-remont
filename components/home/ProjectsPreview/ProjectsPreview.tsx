import { getProjects } from "@/lib/getProjects";
import type { PublicProject } from "@/types/projects";
import ProjectsPreviewClient from "./ProjectsPreviewClient";

export default async function ProjectsPreview() {
  const projects: PublicProject[] = await getProjects();

  return <ProjectsPreviewClient projects={projects} />;
}
