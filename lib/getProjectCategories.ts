import { getPayload } from "payload";
import config from "@payload-config";

import type { PublicProjectCategory } from "@/types/projects";

export async function getProjectCategories(): Promise<
  PublicProjectCategory[]
> {
  try {
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
  } catch (error) {
    console.error("Failed to fetch project categories:", error);
    return [];
  }
}