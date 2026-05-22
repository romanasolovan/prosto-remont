export type PublicProject = {
  id: string;
  title: string;
  slug: string;
  category: "residential" | "commercial";
  description: string;
  coverImages: string[];
  galleryImages: string[];
  featured?: boolean;
};
