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
      name: "video",
      type: "upload",
      relationTo: "media",
      label: "Optional Review Video",
      filterOptions: {
        mimeType: {
          in: ["video/mp4", "video/webm"],
        },
      },
      admin: {
        description:
          "Optional video added by the website owner. Only MP4 and WebM videos can be selected. Maximum file size: 50 MB.",
      },
    },
    {
      name: "googleReviewUrl",
      type: "text",
      label: "Google Review Link",
      admin: {
        description:
          "Optional direct link to the matching review on Google. Leave empty if this review was not published on Google.",
      },
      validate: (value: string | null | undefined) => {
        if (!value) {
          return true;
        }

        try {
          const url = new URL(value);

          const allowedHosts = [
            "google.com",
            "www.google.com",
            "maps.google.com",
            "goo.gl",
            "g.page",
          ];

          const isAllowedHost = allowedHosts.some(
            (host) =>
              url.hostname === host || url.hostname.endsWith(`.${host}`),
          );

          return isAllowedHost
            ? true
            : "Enter a valid Google or Google Maps review URL.";
        } catch {
          return "Enter a valid URL.";
        }
      },
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
