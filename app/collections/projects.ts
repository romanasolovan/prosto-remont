import type { CollectionConfig } from "payload";

export const Projects: CollectionConfig = {
  slug: "projects",

  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },

  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "featured", "status", "updatedAt"],
    group: "Business",
    description: "Projects displayed on the portfolio page.",
  },

  labels: {
    singular: "Project",
    plural: "Projects",
  },

  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },

    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      label: "URL Slug",
      admin: {
        description:
          "Use lowercase words separated by hyphens, for example: modern-kitchen-renovation.",
      },
    },

    {
      name: "category",
      type: "select",
      required: true,
      options: [
        {
          label: "Residential",
          value: "residential",
        },
        {
          label: "Commercial",
          value: "commercial",
        },
      ],
    },

    {
      name: "description",
      type: "textarea",
      required: true,
    },

    {
      name: "coverImages",
      type: "relationship",
      relationTo: "media",
      hasMany: true,
      required: true,
      label: "Project Card Images",
      admin: {
        description: "Images used on the projects listing page.",
      },
    },

    {
      name: "galleryImages",
      type: "relationship",
      relationTo: "media",
      hasMany: true,
      label: "Project Detail Gallery",
      admin: {
        description: "Images shown inside the individual project page.",
      },
    },

    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      label: "Show on Homepage",
      admin: {
        description: "Use this later for homepage featured projects.",
      },
    },

    {
      name: "status",
      type: "select",
      defaultValue: "draft",
      label: "Published Status",
      admin: {
        position: "sidebar",
        description: "Only published projects appear on the website.",
      },
      options: [
        {
          label: "Draft",
          value: "draft",
        },
        {
          label: "Published",
          value: "published",
        },
      ],
    },

    {
      name: "order",
      type: "number",
      defaultValue: 0,
      label: "Display Order",
      admin: {
        position: "sidebar",
        description: "Lower numbers appear first.",
      },
    },
  ],
};
