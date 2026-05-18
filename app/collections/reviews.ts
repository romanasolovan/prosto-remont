import type { CollectionConfig } from "payload";

export const Reviews: CollectionConfig = {
  slug: "reviews",

  access: {
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },

  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "rating", "location", "status", "createdAt"],
    group: "Business",
  },

  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: "Client Name",
    },
    {
      name: "location",
      type: "text",
      required: true,
      label: "Location",
    },
    {
      name: "rating",
      type: "number",
      required: true,
      min: 1,
      max: 5,
      label: "Rating",
    },
    {
      name: "comment",
      type: "textarea",
      required: true,
      label: "Review Comment",
    },
    {
      name: "originalLanguage",
      type: "select",
      required: true,
      defaultValue: "en",
      label: "Original Language",
      options: [
        { label: "English", value: "en" },
        { label: "Polish", value: "pl" },
        { label: "Ukrainian", value: "uk" },
        { label: "Russian", value: "ru" },
      ],
    },
    {
      name: "photo",
      type: "relationship",
      relationTo: "media",
      label: "Optional Photo",
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "pending",
      label: "Status",
      options: [
        { label: "Pending Review", value: "pending" },
        { label: "Approved", value: "approved" },
        { label: "Rejected", value: "rejected" },
      ],
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      label: "Feature this review",
    },
    {
      name: "internalNotes",
      type: "textarea",
      label: "Internal Notes",
    },
  ],
};
