import type { CollectionConfig } from "payload";

export const TrustedBrands: CollectionConfig = {
  slug: "trusted-brands",

  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },

  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "status", "order", "updatedAt"],
    group: "Business",
    description: "Brands and clients displayed in the trusted brands carousel.",
  },

  labels: {
    singular: "Trusted Brand",
    plural: "Trusted Brands",
  },

  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: "Brand Name",
    },
    {
      name: "mark",
      type: "text",
      label: "Fallback Initials",
      admin: {
        description: "Used if no logo is uploaded, for example: DS, GHG, MH.",
      },
    },
    {
      name: "logo",
      type: "relationship",
      relationTo: "media",
      label: "Brand Logo",
      admin: {
        description: "Upload a logo image for the carousel.",
      },
    },
    {
      name: "href",
      type: "text",
      label: "Link",
      admin: {
        description: "Optional. Example: /projects#dar-sport-space",
      },
    },
    {
      name: "status",
      type: "select",
      defaultValue: "published",
      label: "Publishing Status",
      admin: {
        position: "sidebar",
        description: "Only published brands appear on the website.",
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
