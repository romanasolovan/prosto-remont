export type PublicService = {
  id: string;

  title: string;
  slug: string;

  category: string;

  shortDescription: string;
  fullDescription?: string;

  price?: string;
  abbr?: string;

  specs: {
    label: string;
    value: string;
  }[];

  steps: {
    title: string;
    body: string;
  }[];

  featured?: boolean;
};
