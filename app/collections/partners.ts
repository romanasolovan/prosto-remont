import type { CollectionConfig } from "payload";

export const Partners: CollectionConfig = {
  slug: "partners",

  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },

  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "website", "status", "order"],
    group: "Business",
  },

  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: "Partner Name",
    },
    {
      name: "logo",
      type: "relationship",
      relationTo: "media",
      label: "Partner Logo",
      admin: {
        description: "Upload or select the partner logo shown in the carousel.",
      },
    },
    {
      name: "website",
      type: "text",
      label: "Website",
      admin: {
        description:
          "Optional external website URL. Example: https://example.com",
      },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "active",
      options: [
        {
          label: "Active",
          value: "active",
        },
        {
          label: "Hidden",
          value: "hidden",
        },
      ],
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      label: "Display Order",
      admin: {
        description: "Lower numbers appear first. Example: 1, 2, 3.",
      },
    },
  ],
};
