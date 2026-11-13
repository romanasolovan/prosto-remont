import "server-only";

import { unstable_cache } from "next/cache";
import { getPayload } from "payload";
import config from "@payload-config";

import type { PublicProjectCategory } from "@/types/projects";

export const getProjectCategories = unstable_cache(
  async (): Promise<PublicProjectCategory[]> => {
    const payload = await getPayload({ config });

    const result = await payload.find({
      collection: "project-categories",
      depth: 0,
      sort: "order",
      limit: 100,
      overrideAccess: false,
    });

    return result.docs.map((category) => ({
      id: String(category.id),
      name: category.name,
      slug: category.slug,
    }));
  },
  ["project-categories"],
  {
    revalidate: 60,
    tags: ["project-categories"],
  },
);
