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
    description:
      "Client reviews submitted from the website form. Only approved reviews appear publicly.",
  },

  labels: {
    singular: "Review",
    plural: "Reviews",
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
      name: "translations",
      type: "group",
      label: "Website Translations",
      admin: {
        description:
          "Optional translated versions. If empty, the website will show the original review comment.",
      },
      fields: [
        {
          name: "en",
          type: "textarea",
          label: "English Translation",
        },
        {
          name: "pl",
          type: "textarea",
          label: "Polish Translation",
        },
        {
          name: "uk",
          type: "textarea",
          label: "Ukrainian Translation",
        },
        {
          name: "ru",
          type: "textarea",
          label: "Russian Translation",
        },
      ],
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
      label: "Review Status",
      admin: {
        position: "sidebar",
        description:
          "Set to 'Approved' to show the review on the website. Keep as 'Pending' to hide it until you review the content.",
      },
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
      label: "Showed as featured review",
      admin: {
        position: "sidebar",
        description: "Use this later to highlight selected reviews.",
      },
    },
    {
      name: "internalNotes",
      type: "textarea",
      label: "Owner Notes",
      admin: {
        description:
          "Private notes for the team. These are never shown on the website.",
      },
    },
  ],
};
