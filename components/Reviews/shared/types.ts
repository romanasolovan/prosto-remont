export type PublicUploadedReviewVideo = {
  source: "upload";
  url: string;
  mimeType: "video/mp4" | "video/webm";
  filesize: number | null;
  filename: string | null;
};

export type PublicInstagramReviewVideo = {
  source: "instagram";
  url: string;
  posterUrl: string;
};

export type PublicReviewVideo =
  | PublicUploadedReviewVideo
  | PublicInstagramReviewVideo;

export interface PublicReview {
  id: string;
  name: string;
  rating: number;
  comment: string;
  translations?: {
    en?: string | null;
    pl?: string | null;
    uk?: string | null;
    ru?: string | null;
  } | null;
  location: string;
  date: string;
  photoUrl?: string;
  video?: PublicReviewVideo;
  googleReviewUrl?: string;
}