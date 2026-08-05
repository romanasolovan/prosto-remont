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
    description:
      "Brands and clients displayed in the trusted brands carousel.",
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
        description:
          "Used if no logo is uploaded, for example: DS, GHG, MH.",
      },
    },

    {
      name: "logo",
      type: "relationship",
      relationTo: "media",
      label: "Brand Logo",
      admin: {
        description:
          "Upload or select the logo displayed in the trusted brands carousel.",
      },
    },

    {
      name: "description",
      type: "group",
      label: "Popup Description",
      admin: {
        description:
          "Add a short brand description for every supported website language.",
      },
      fields: [
        {
          name: "pl",
          type: "textarea",
          label: "Polish",
          admin: {
            description:
              "Short Polish description displayed inside the brand popup.",
            rows: 3,
          },
        },
        {
          name: "en",
          type: "textarea",
          label: "English",
          admin: {
            description:
              "Short English description displayed inside the brand popup.",
            rows: 3,
          },
        },
        {
          name: "uk",
          type: "textarea",
          label: "Ukrainian",
          admin: {
            description:
              "Short Ukrainian description displayed inside the brand popup.",
            rows: 3,
          },
        },
        {
          name: "ru",
          type: "textarea",
          label: "Russian",
          admin: {
            description:
              "Short Russian description displayed inside the brand popup.",
            rows: 3,
          },
        },
      ],
    },

    {
      name: "website",
      type: "text",
      label: "Official Website",
      admin: {
        description:
          "Optional external brand website. Include the complete URL, for example: https://example.com.",
      },
    },

    {
      name: "featuredProject",
      type: "relationship",
      relationTo: "projects",
      label: "Related Project",
      admin: {
        description:
          "Select the project that should open when a visitor clicks the work preview.",
      },
    },

    {
      name: "projectPreviewImage",
      type: "relationship",
      relationTo: "media",
      label: "Project Preview Image",
      admin: {
        description:
          "Optional custom image shown in the popup. If empty, the first related project cover image can be used.",
      },
    },

    {
      name: "href",
      type: "text",
      label: "Legacy Link",
      admin: {
        description:
          "Existing optional internal link. Preserved for compatibility with the current frontend.",
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