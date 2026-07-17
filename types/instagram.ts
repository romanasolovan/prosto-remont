export type InstagramMediaType = "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";

export interface PublicInstagramPost {
  id: string;
  mediaType: InstagramMediaType;
  mediaUrl: string;
  thumbnailUrl: string;
  permalink: string;
  caption?: string;
  timestamp: string;
}
