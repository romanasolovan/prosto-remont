import type { BlogPost } from "@/payload-types";

export type PublicBlogImage = {
  url: string;
  alt: string;
  width: number | null;
  height: number | null;
};

export type PublicBlogPostSummary = {
  id: string;
  title: string;
  slug: string;
  coverImage: PublicBlogImage;
  publishedAt: string;
  author: string;
};

export type PublicBlogPost = PublicBlogPostSummary & {
  content: BlogPost["content"];
  media:
    | {
        type: "instagram";
        url: string;
      }
    | {
        type: "youtube";
        url: string;
      }
    | null;
};