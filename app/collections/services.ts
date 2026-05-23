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
      name: "shortDescription",
      type: "textarea",
      required: true,
    },
    {
      name: "fullDescription",
      type: "textarea",
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
    },
    {
      name: "abbr",
      type: "text",
      label: "Card abbreviation",
    },
    {
      name: "specs",
      type: "array",
      label: "Service Specs",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "value", type: "text", required: true },
      ],
    },
    {
      name: "steps",
      type: "array",
      label: "Process Steps",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "body", type: "textarea", required: true },
      ],
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
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
      ],
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
    },
  ],
};
