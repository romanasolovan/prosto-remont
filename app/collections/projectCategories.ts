
import type { CollectionConfig } from "payload";

export const ProjectCategories: CollectionConfig = {
  slug: "project-categories",

  labels: {
    singular: "Project Category",
    plural: "Project Categories",
  },

  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "slug", "order", "updatedAt"],
    group: "Business",
    description: "Manage categories used to organize portfolio projects.",
  },

  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },

  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: "Category Name",
      admin: {
        description: "The name displayed in the Projects navigation.",
      },
    },
    
{
  name: "slug",
  type: "text",
  required: true,
  unique: true,
  label: "Category Slug",
  validate: (value: unknown) => {
    if (typeof value !== "string" || !value.trim()) {
      return "A category slug is required.";
    }

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) {
      return "Use lowercase letters, numbers, and hyphens only.";
    }

    return true;
  },
  admin: {
    description:
      "Use lowercase letters and hyphens, for example: lokale-uslugowe.",
  },
},

    {
      name: "description",
      type: "textarea",
      label: "Description",
      admin: {
        description: "Optional description for this category.",
      },
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
