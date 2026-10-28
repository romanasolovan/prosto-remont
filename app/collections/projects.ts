import type { CollectionConfig } from "payload";
import { validateProjectGallery } from "./projectGalleryValidation";

export const Projects: CollectionConfig = {
  slug: "projects",

  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },

  hooks: {
  beforeValidate: [validateProjectGallery],
},

  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "categories", "featured", "status", "updatedAt"],
    group: "Business",
    description: "Projects displayed on the portfolio page.",
  },

  labels: {
    singular: "Project",
    plural: "Projects",
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
      label: "URL Slug",
      admin: {
        description:
          "Use lowercase words separated by hyphens, for example: modern-kitchen-renovation.",
      },
    },
    {
  name: "categories",
  type: "relationship",
  relationTo: "project-categories",
  hasMany: true,
  required: false,
  label: "Project Categories",
  admin: {
    description:
      "Select one or more categories for this project.",
  },
},

    {
      name: "description",
      type: "textarea",
      required: true,
    },

    {
      name: "coverImages",
      type: "relationship",
      relationTo: "media",
      hasMany: true,
      required: true,
      label: "Project Card Images",
      admin: {
        description: "Images used on the projects listing page.",
      },
    },

    {
      name: "galleryImages",
      type: "relationship",
      relationTo: "media",
      hasMany: true,
      label: "Project Detail Gallery",
      admin: {
        description: "Images shown inside the individual project page.",
      },
    },


{
  name: "gallerySections",
  type: "array",
  label: "Project Gallery Sections",
  admin: {
    description:
      "Organize project images and videos into separate gallery sections. Drag sections to change their order.",
    initCollapsed: true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Section Title",
      admin: {
        description:
          "For example: Mieszkanie 46 m², Łazienki, or Detale.",
      },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      label: "Section URL Slug",
      admin: {
        description:
          "Use lowercase letters, numbers, and hyphens. For example: lazienki.",
      },
      validate: (value: unknown) => {
        if (typeof value !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) {
          return "Use lowercase letters, numbers, and hyphens only.";
        }

        return true;
      },
    },
    {
      name: "description",
      type: "textarea",
      label: "Section Description",
      admin: {
        description:
          "Optional short description displayed below the section title.",
      },
    },
    {
      name: "mediaItems",
      type: "array",
      label: "Gallery Media",
      admin: {
        description:
          "Add images and uploaded videos in the order they should appear.",
        initCollapsed: true,
      },
      fields: [
        {
          name: "media",
          type: "relationship",
          relationTo: "media",
          required: true,
          label: "Image or Video",
          admin: {
            description:
              "Select an existing image or video, or upload a new one.",
          },
        },
        {
          name: "poster",
          type: "relationship",
          relationTo: "media",
          label: "Video Thumbnail",
          admin: {
            description:
              "Select an image to display as the square thumbnail for a video.",
          },
        },
        {
          name: "caption",
          type: "text",
          label: "Media Caption",
          admin: {
            description:
              "Optional caption displayed inside the image/video viewer.",
          },
        },
        {
          name: "sourceUrl",
          type: "text",
          label: "Original Video Source URL",
          admin: {
            description:
              "Optional link to the original video on Instagram or another website.",
          },
          validate: (value: unknown) => {
            if (!value) return true;

            if (typeof value !== "string") {
              return "Enter a valid URL.";
            }

            try {
              const url = new URL(value);

              return ["http:", "https:"].includes(url.protocol)
                ? true
                : "Only HTTP and HTTPS links are allowed.";
            } catch {
              return "Enter a valid URL, including https://.";
            }
          },
        },
      ],
    },
  ],
},


    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      label: "Show on Homepage",
      admin: {
        description: "Use this later for homepage featured projects.",
      },
    },

    {
      name: "status",
      type: "select",
      defaultValue: "draft",
      label: "Published Status",
      admin: {
        position: "sidebar",
        description: "Only published projects appear on the website.",
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
