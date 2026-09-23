export type PublicUploadedReviewVideo = {
  url: string;
  mimeType: "video/mp4" | "video/webm";
  filesize: number | null;
  filename: string | null;
};

export interface PublicReview {
  id: string;
  reviewType: "written" | "video";
  name: string;
  rating: number;
  comment?: string;
  translations?: {
    en?: string | null;
    pl?: string | null;
    uk?: string | null;
    ru?: string | null;
  } | null;
  location: string;
  date: string;
  photoUrl?: string;
  googleReviewUrl?: string;
  video?: PublicUploadedReviewVideo;
  videoCardImageUrl?: string;
  videoSourceUrl?: string;
  videoNote?: string;
}