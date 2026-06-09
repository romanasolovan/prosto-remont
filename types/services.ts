export type PublicServiceItem = {
  id: string;
  name: string;
  price: string;
  order: number;
};

export type PublicService = {
  id: string;
  title: string;
  slug: string;
  items: PublicServiceItem[];
  featured?: boolean;
  order?: number;
};
