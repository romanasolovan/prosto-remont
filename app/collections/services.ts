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
    defaultColumns: ["title", "status", "order"],
    group: "Business",
    description:
      "Service categories and price-list items displayed on the services page.",
  },

  labels: {
    singular: "Service Category",
    plural: "Service Categories",
  },

  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Category Title",
      admin: {
        description:
          "Example: Prace malarskie, Instalacje G-K, Hydraulika / Elektryka.",
      },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      label: "URL Slug",
      admin: {
        description:
          "Use lowercase words separated by hyphens, for example: prace-malarskie.",
      },
    },
    {
      name: "items",
      type: "array",
      required: true,
      label: "Service Items",
      labels: {
        singular: "Service Item",
        plural: "Service Items",
      },
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
          label: "Service Name",
          admin: {
            description: "Example: Szlifowanie ścian.",
          },
        },
        {
          name: "price",
          type: "text",
          required: true,
          label: "Price",
          admin: {
            description: "Example: 18 zł/m², 150 zł/szt., 20 zł/mb.",
          },
        },
        {
          name: "order",
          type: "number",
          defaultValue: 0,
          label: "Item Order",
        },
      ],
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      label: "Show on Homepage",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "status",
      type: "select",
      defaultValue: "draft",
      label: "Published Status",
      admin: {
        position: "sidebar",
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
      label: "Category Order",
      admin: {
        position: "sidebar",
        description: "Lower numbers appear first.",
      },
    },
  ],
};
