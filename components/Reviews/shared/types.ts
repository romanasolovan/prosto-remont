export interface PublicReviewVideo {
  url: string;
  mimeType: "video/mp4" | "video/webm";
  filesize: number | null;
  filename: string | null;
}

export interface PublicReview {
  id: string;
  name: string;
  rating: number;
  comment: string;
  translations?: {
    en?: string;
    pl?: string;
    uk?: string;
    ru?: string;
  };
  location: string;
  date: string;
  photoUrl?: string;
  video?: PublicReviewVideo;
  googleReviewUrl?: string;
}
