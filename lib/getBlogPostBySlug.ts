import { cache } from "react";

import type { PublicBlogPost } from "@/types/blog";

import { getSiteUrl } from "@/lib/getSiteUrl";

type PublicBlogPostResponse = {
  success: boolean;
  post: PublicBlogPost | null;
};

export const getBlogPostBySlug = cache(
  async (
    slug: string,
  ): Promise<PublicBlogPost | null> => {
    const normalizedSlug = slug
      .trim()
      .toLowerCase();

    if (!normalizedSlug) {
      return null;
    }

    try {
      const response = await fetch(
        `${getSiteUrl()}/api/public/blog/${encodeURIComponent(
          normalizedSlug,
        )}`,
        {
          cache: "no-store",
          headers: {
            Accept: "application/json",
          },
        },
      );

      if (response.status === 404) {
        return null;
      }

      if (!response.ok) {
        throw new Error(
          `Failed to fetch blog post: ${response.status}`,
        );
      }

      const data =
        (await response.json()) as PublicBlogPostResponse;

      return data.post ?? null;
    } catch (error) {
      console.error(
        `Failed to load blog post "${normalizedSlug}":`,
        error,
      );

      return null;
    }
  },
);