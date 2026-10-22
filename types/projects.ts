export type PublicProject = {
  id: string;
  title: string;
  slug: string;

  // Legacy category, kept until the frontend transition is complete.
  category: "residential" | "commercial";

  // New categories managed through Payload.
  categories: PublicProjectCategory[];

  description: string;
  coverImages: string[];
  galleryImages: string[];
  featured?: boolean;
};

export type PublicProjectCategory = {
  id: string;
  name: string;
  slug: string;
}
