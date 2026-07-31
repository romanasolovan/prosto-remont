import type { PublicBlogPostSummary } from "@/types/blog";

import { getSiteUrl } from "@/lib/getSiteUrl";

type PublicBlogPostsResponse = {
  success: boolean;
  posts: PublicBlogPostSummary[];
};

export async function getBlogPosts(): Promise<
  PublicBlogPostSummary[]
> {
  try {
    const response = await fetch(
      `${getSiteUrl()}/api/public/blog`,
      {
        cache: "no-store",
        headers: {
          Accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch blog posts: ${response.status}`,
      );
    }

    const data =
      (await response.json()) as PublicBlogPostsResponse;

    return Array.isArray(data.posts)
      ? data.posts
      : [];
  } catch (error) {
    console.error(
      "Failed to load public blog posts:",
      error,
    );

    return [];
  }
}