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
        description:
          "Upload or select the partner logo shown in the carousel.",
      },
    },

    {
      name: "description",
      type: "group",
      label: "Description",
      admin: {
        description:
          "Add the partner description in all supported website languages. Maximum 1000 characters per language.",
      },
      fields: [
        {
          name: "pl",
          type: "textarea",
          label: "Polish",
          maxLength: 1000,
          admin: {
            rows: 5,
          },
        },
        {
          name: "en",
          type: "textarea",
          label: "English",
          maxLength: 1000,
          admin: {
            rows: 5,
          },
        },
        {
          name: "uk",
          type: "textarea",
          label: "Ukrainian",
          maxLength: 1000,
          admin: {
            rows: 5,
          },
        },
        {
          name: "ru",
          type: "textarea",
          label: "Russian",
          maxLength: 1000,
          admin: {
            rows: 5,
          },
        },
      ],
    },

    {
      name: "website",
      type: "text",
      label: "Website",
      validate: (value: string | null | undefined) => {
        if (!value) return true;

        try {
          const url = new URL(value);

          if (!["http:", "https:"].includes(url.protocol)) {
            return "Use a valid http or https website URL.";
          }

          return true;
        } catch {
          return "Enter a complete website URL, for example https://example.com.";
        }
      },
      admin: {
        description:
          "Optional external website URL, including https://.",
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
        description:
          "Lower numbers appear first. Example: 1, 2, 3.",
      },
    },
  ],
};