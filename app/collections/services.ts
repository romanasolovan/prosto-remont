import type { CollectionConfig } from "payload";

export const Services: CollectionConfig = {
  slug: "services",

  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },

  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "price", "status", "order"],
    group: "Business",
    description:
      "Services displayed on the services page and homepage preview.",
  },

  labels: {
    singular: "Service",
    plural: "Services",
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
          "Use lowercase words separated by hyphens, for example: bathroom-renovation.",
      },
    },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "Kitchen", value: "kitchen" },
        { label: "Bathroom", value: "bathroom" },
        { label: "Basement", value: "basement" },
        { label: "Full Home", value: "fullHome" },
        { label: "Commercial", value: "commercial" },
        { label: "Carpentry", value: "carpentry" },
      ],
    },
    {
      name: "price",
      type: "text",
      label: "Price / Starting price",
      admin: {
        description: "Example: From 250 zł/m² or Custom quote.",
      },
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      label: "Show on Homepage",
      admin: {
        position: "sidebar",
        description: "Use this for homepage service preview.",
      },
    },
    {
      name: "status",
      type: "select",
      defaultValue: "draft",
      label: "Published Status",
      admin: {
        position: "sidebar",
        description: "Only published services appear on the website.",
      },
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
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
