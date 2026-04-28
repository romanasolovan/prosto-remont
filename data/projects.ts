export type Subproject = {
  slug: string;
  title: string;
  description: string;
  images: string[];
};

export type Project = {
  slug: string;
  title: string;
  category: "residential" | "commercial";
  description: string;
  coverImages: string[];
  galleryImages: string[];
  subprojects?: Subproject[];
};

export const projects: Project[] = [
  {
    slug: "modern-kitchen",
    title: "Modern Kitchen",
    category: "residential",
    description:
      "A sleek and functional kitchen renovation focused on clean lines, warm materials, and practical storage solutions.",
    coverImages: [
      "/projects/modern-kitchen-1.jpg",
      "/projects/modern-kitchen-2.jpg",
      "/projects/modern-kitchen-3.jpg",
      "/projects/modern-kitchen-4.jpg",
    ],
    galleryImages: [
      "/projects/modern-kitchen-1.jpg",
      "/projects/modern-kitchen-2.jpg",
      "/projects/modern-kitchen-3.jpg",
      "/projects/modern-kitchen-4.jpg",
    ],
    subprojects: [
      {
        slug: "island-zone",
        title: "Island Zone",
        description:
          "A social centerpiece with seating, lighting, and extra storage.",
        images: [
          "/projects/modern-kitchen-1.jpg",
          "/projects/modern-kitchen-2.jpg",
        ],
      },
      {
        slug: "storage-wall",
        title: "Storage Wall",
        description:
          "Tall cabinetry and integrated appliances for a clean and elegant finish.",
        images: [
          "/projects/modern-kitchen-3.jpg",
          "/projects/modern-kitchen-4.jpg",
        ],
      },
    ],
  },
  {
    slug: "downtown-office",
    title: "Downtown Office",
    category: "commercial",
    description:
      "A commercial interior transformation designed to improve workflow, comfort, and modern professional identity.",
    coverImages: [
      "/projects/modern-kitchen-1.jpg",
      "/projects/modern-kitchen-2.jpg",
      "/projects/modern-kitchen-3.jpg",
      "/projects/modern-kitchen-4.jpg",
    ],
    galleryImages: [
      "/projects/modern-kitchen-1.jpg",
      "/projects/modern-kitchen-2.jpg",
      "/projects/modern-kitchen-3.jpg",
      "/projects/modern-kitchen-4.jpg",
    ],
    subprojects: [
      {
        slug: "meeting-room",
        title: "Meeting Room Upgrade",
        description:
          "A more polished meeting environment with better layout and material consistency.",
        images: [],
      },
      {
        slug: "reception-area",
        title: "Reception Area",
        description:
          "A welcoming entrance zone designed to strengthen the first impression.",
        images: [],
      },
    ],
  },
  {
    slug: "master-bathroom",
    title: "Master Bathroom",
    category: "residential",
    description:
      "A spa-inspired bathroom renovation with premium surfaces, layered lighting, and improved usability.",
    coverImages: [
      "/projects/modern-kitchen-1.jpg",
      "/projects/modern-kitchen-2.jpg",
      "/projects/modern-kitchen-3.jpg",
      "/projects/modern-kitchen-4.jpg",
    ],
    galleryImages: [
      "/projects/modern-kitchen-1.jpg",
      "/projects/modern-kitchen-2.jpg",
      "/projects/modern-kitchen-3.jpg",
      "/projects/modern-kitchen-4.jpg",
    ],
  },
  {
    slug: "historic-home",
    title: "Historic Home",
    category: "residential",
    description:
      "A sensitive restoration project balancing original architectural charm with modern living needs.",
    coverImages: [],
    galleryImages: [],
  },
  {
    slug: "retail-store",
    title: "Retail Store",
    category: "commercial",
    description:
      "A retail interior refresh focused on customer flow, product presentation, and visual identity.",
    coverImages: [],
    galleryImages: [],
  },
  {
    slug: "basement-conversion",
    title: "Basement Conversion",
    category: "residential",
    description:
      "A dark and underused basement reimagined as a comfortable, bright, and practical living space.",
    coverImages: [],
    galleryImages: [],
  },
];
