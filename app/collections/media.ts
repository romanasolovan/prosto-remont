import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",

  access: {
    read: () => true,
  },

  admin: {
    useAsTitle: "filename",
    defaultColumns: ["filename", "mimeType", "filesize", "updatedAt"],
    description:
      "Images and videos used across projects, reviews, trusted brands, partners, and other website content.",
  },

  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      label: "Alternative Text",
      admin: {
        description:
          "Describe the image or video for accessibility and administration.",
      },
    },
  ],

  upload: {
    mimeTypes: [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/avif",
      "image/gif",
      "image/svg+xml",
      "video/mp4",
      "video/webm",
    ],
  },
};
