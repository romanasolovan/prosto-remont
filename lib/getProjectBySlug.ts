import "server-only";

import { cache } from "react";
import { getPayload } from "payload";
import config from "@payload-config";

import { mapProject } from "@/lib/getProjects";
import type { PublicProject } from "@/types/projects";

export const getProjectBySlug = cache(
  async (slug: string): Promise<PublicProject | null> => {
    const payload = await getPayload({ config });

    const result = await payload.find({
      collection: "projects",
      where: {
        and: [
          {
            slug: {
              equals: slug,
            },
          },
          {
            status: {
              equals: "published",
            },
          },
        ],
      },
      depth: 2,
      limit: 1,
    });

    const project = result.docs[0];

    return project ? mapProject(project) : null;
  },
);
