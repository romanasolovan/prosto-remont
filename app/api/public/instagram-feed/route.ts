import { NextResponse } from "next/server";
import type { PublicInstagramPost } from "@/types/instagram";

export const revalidate = 3600;

interface RawInstagramMedia {
  id: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
  timestamp: string;
}

interface RawInstagramResponse {
  data: RawInstagramMedia[];
}

const POST_LIMIT = 12;

export async function GET() {
  const accessToken = process.env.INSTAGRAM_GRAPH_ACCESS_TOKEN;
  const accountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;
  const apiVersion = process.env.INSTAGRAM_GRAPH_API_VERSION || "v21.0";
  const baseUrl =
    process.env.INSTAGRAM_GRAPH_BASE_URL || "https://graph.instagram.com";

  if (!accessToken || !accountId) {
    console.error(
      "Instagram feed: missing INSTAGRAM_GRAPH_ACCESS_TOKEN or INSTAGRAM_BUSINESS_ACCOUNT_ID",
    );
    return NextResponse.json({ posts: [] });
  }

  const fields = [
    "id",
    "media_type",
    "media_url",
    "thumbnail_url",
    "permalink",
    "caption",
    "timestamp",
  ].join(",");

  const url = `${baseUrl}/${apiVersion}/${accountId}/media?fields=${fields}&limit=${POST_LIMIT}&access_token=${accessToken}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(
        "Instagram feed: Graph API error",
        response.status,
        errorBody,
      );
      return NextResponse.json({ posts: [] });
    }

    const data: RawInstagramResponse = await response.json();

    const posts: PublicInstagramPost[] = data.data
      .filter((item) => item.media_url || item.thumbnail_url)
      .map((item) => ({
        id: item.id,
        mediaType: item.media_type,
        mediaUrl: item.media_url || item.thumbnail_url || "",
        thumbnailUrl: item.thumbnail_url || item.media_url || "",
        permalink: item.permalink,
        caption: item.caption,
        timestamp: item.timestamp,
      }));

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Instagram feed: fetch failed", error);
    return NextResponse.json({ posts: [] });
  }
}
