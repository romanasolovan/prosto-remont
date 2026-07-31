import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

import type {
  BlogPost,
  Media,
} from "@/payload-types";
import type {
  PublicBlogImage,
  PublicBlogPost,
} from "@/types/blog";

export const runtime = "nodejs";

interface BlogPostRouteContext {
  params: Promise<{
    slug: string;
  }>;
}

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

const getPublicExternalMedia = (
  post: BlogPost,
): PublicBlogPost["media"] => {
  if (post.mediaType === "instagram") {
    const url = post.instagramUrl?.trim();

    return url
      ? {
          type: "instagram",
          url,
        }
      : null;
  }

  if (post.mediaType === "youtube") {
    const url = post.youtubeUrl?.trim();

    return url
      ? {
          type: "youtube",
          url,
        }
      : null;
  }

  return null;
};

export async function GET(
  _request: Request,
  context: BlogPostRouteContext,
) {
  try {
    const { slug } = await context.params;

    const normalizedSlug = slug.trim().toLowerCase();

    if (!normalizedSlug) {
      return NextResponse.json(
        {
          success: false,
          post: null,
        },
        {
          status: 400,
        },
      );
    }

    const payload = await getPayload({ config });

    const result = await payload.find({
      collection: "blog-posts",
      where: {
        and: [
          {
            slug: {
              equals: normalizedSlug,
            },
          },
          {
            status: {
              equals: "published",
            },
          },
        ],
      },
      depth: 1,
      limit: 1,
    });

    const post = result.docs[0];

    if (!post) {
      return NextResponse.json(
        {
          success: false,
          post: null,
        },
        {
          status: 404,
        },
      );
    }

    const coverImage = getPublicBlogImage(
      post.coverImage,
    );

    if (!coverImage) {
      console.error(
        `Published blog post "${post.slug}" has no resolved cover image.`,
      );

      return NextResponse.json(
        {
          success: false,
          post: null,
        },
        {
          status: 500,
        },
      );
    }

    const publicPost: PublicBlogPost = {
      id: String(post.id),
      title: post.title,
      slug: post.slug,
      coverImage,
      publishedAt: post.publishedAt,
      author: post.author,
      content: post.content,
      media: getPublicExternalMedia(post),
    };

    return NextResponse.json({
      success: true,
      post: publicPost,
    });
  } catch (error) {
    console.error(
      "Failed to fetch public blog post:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        post: null,
      },
      {
        status: 500,
      },
    );
  }
}