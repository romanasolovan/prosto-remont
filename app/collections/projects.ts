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
    },

    {
      name: "galleryImages",
      type: "relationship",
      relationTo: "media",
      hasMany: true,
    },

    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
    },

    {
      name: "status",
      type: "select",
      defaultValue: "draft",
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
    },
  ],
};
