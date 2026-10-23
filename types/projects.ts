export type PublicProject = {
  id: string;
  title: string;
  slug: string;
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
