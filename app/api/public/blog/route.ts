import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

import type { Media } from "@/payload-types";
import type {
  PublicBlogImage,
  PublicBlogPostSummary,
} from "@/types/blog";

export const runtime = "nodejs";

const getPublicBlogImage = (
  media: number | Media,
): PublicBlogImage | undefined => {
  if (
    typeof media !== "object" ||
    !media.url
  ) {
    return undefined;
  }

  return {
    url: media.url,
    alt: media.alt,
    width: media.width ?? null,
    height: media.height ?? null,
  };
};

export async function GET() {
  try {
    const payload = await getPayload({ config });

    const result = await payload.find({
      collection: "blog-posts",
      where: {
        status: {
          equals: "published",
        },
      },
      depth: 1,
      limit: 100,
      sort: [
        "order",
        "-publishedAt",
      ],
    });

    const posts = result.docs.reduce<
      PublicBlogPostSummary[]
    >((accumulator, post) => {
      const coverImage = getPublicBlogImage(
        post.coverImage,
      );

      /*
       * coverImage is required in Payload, but this guard keeps
       * the public API safe if an old or malformed record exists.
       */
      if (!coverImage) {
        return accumulator;
      }

      accumulator.push({
        id: String(post.id),
        title: post.title,
        slug: post.slug,
        coverImage,
        publishedAt: post.publishedAt,
        author: post.author,
      });

      return accumulator;
    }, []);

    return NextResponse.json({
      success: true,
      posts,
    });
  } catch (error) {
    console.error(
      "Failed to fetch public blog posts:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        posts: [],
      },
      {
        status: 500,
      },
    );
  }
}