export type PublicProjectCategory = {
  id: string;
  name: string;
  slug: string;
};

export type PublicProjectMediaItem = {
  id: string;
  type: "image" | "video";
  url: string;
  posterUrl: string | null;
  caption: string | null;
  sourceUrl: string | null;
};

export type PublicProjectGallerySection = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  mediaItems: PublicProjectMediaItem[];
};

export type PublicProject = {
  id: string;
  title: string;
  slug: string;
  categories: PublicProjectCategory[];
  description: string;
  coverImages: string[];
  galleryImages: string[];
  gallerySections?: PublicProjectGallerySection[];
  featured?: boolean;
};
