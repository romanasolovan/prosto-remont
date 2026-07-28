export type TemporaryBlogPost = {
  id: string;
  slug: string;
  title: string;
  author: string;
  publishedAt: string;
  imageSrc: string;
  imageAlt: string;
  paragraphs: string[];
  media?: {
    type: "instagram" | "youtube";
    url: string;
  };
};

export const temporaryBlogPosts: TemporaryBlogPost[] = [
  {
    id: "planning-renovation",
    slug: "how-to-prepare-an-apartment-for-renovation",
    title: "How to prepare an apartment for renovation",
    author: "Pro100Remont",
    publishedAt: "2026-06-12",
    imageSrc: "/blog/blog-1.jpg",
    imageAlt: "Bright renovated apartment interior",
    paragraphs: [
      "A successful renovation begins long before the first construction work starts. Careful planning makes it easier to control the budget, schedule and final result.",
      "Before starting, define the scope of work, prepare a realistic budget and decide which parts of the apartment require the most attention.",
      "A clear plan also helps the renovation team understand your expectations and reduces the risk of unexpected changes during the project.",
    ],
  },
  {
    id: "renovation-materials",
    slug: "how-to-choose-renovation-materials",
    title: "How to choose renovation materials",
    author: "Pro100Remont",
    publishedAt: "2026-06-08",
    imageSrc: "/blog/blog-2.jpg",
    imageAlt: "Modern apartment renovation materials",
    paragraphs: [
      "Materials influence the appearance, durability and final cost of every renovation.",
      "Instead of choosing only by price, consider how the material will be used, how easy it is to maintain and whether it matches the conditions of the room.",
      "Well-selected materials can remain attractive for years and reduce the need for future repairs.",
    ],
  },
  {
    id: "renovation-schedule",
    slug: "how-a-professional-renovation-schedule-works",
    title: "How a professional renovation schedule works",
    author: "Pro100Remont",
    publishedAt: "2026-06-02",
    imageSrc: "/blog/blog-3.jpg",
    imageAlt: "Professional apartment renovation in progress",
    paragraphs: [
      "A professional schedule defines the correct order of renovation work and helps prevent unnecessary delays.",
      "Installation work, wall preparation, flooring and final finishing must be coordinated carefully.",
      "A realistic schedule also gives the client a clearer understanding of the progress and expected completion date.",
    ],
  },
  {
    id: "turnkey-renovation",
    slug: "turnkey-apartment-renovation",
    title: "Turnkey apartment renovation",
    author: "Pro100Remont",
    publishedAt: "2026-05-28",
    imageSrc: "/blog/blog-4.jpg",
    imageAlt: "Completed turnkey apartment renovation",
    paragraphs: [
      "A turnkey renovation brings planning, construction and finishing work together in one coordinated process.",
      "The client does not need to organize separate teams or manage every stage independently.",
      "This approach makes communication simpler and helps maintain consistent quality from the first consultation to the final handover.",
    ],
  },
];

export function getTemporaryBlogPost(
  slug: string,
): TemporaryBlogPost | undefined {
  return temporaryBlogPosts.find((post) => post.slug === slug);
}