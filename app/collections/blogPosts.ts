import type { CollectionConfig } from "payload";

type BlogMediaType = "none" | "instagram" | "youtube";

type BlogPostSiblingData = {
  mediaType?: BlogMediaType | null;
};

const validateSlug = (
  value: string | null | undefined,
): true | string => {
  if (!value) {
    return "Enter a URL slug.";
  }

  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)
    ? true
    : "Use lowercase letters, numbers, and single hyphens only. Example: how-to-plan-a-renovation.";
};

const validateInstagramUrl = (
  value: string | null | undefined,
): true | string => {
  if (!value) {
    return true;
  }

  try {
    const url = new URL(value);

    if (url.protocol !== "https:") {
      return "Instagram links must use HTTPS.";
    }

    const hostname = url.hostname.toLowerCase();

    const isInstagramHost =
      hostname === "instagram.com" ||
      hostname.endsWith(".instagram.com");

    if (!isInstagramHost) {
      return "Enter a valid Instagram URL.";
    }

    const isSupportedPath =
      /^\/(?:p|reel|reels)\/[A-Za-z0-9_-]+\/?$/.test(
        url.pathname,
      );

    return isSupportedPath
      ? true
      : "Enter a public Instagram Post or Reel URL.";
  } catch {
    return "Enter a valid Instagram URL.";
  }
};

const validateYouTubeUrl = (
  value: string | null | undefined,
): true | string => {
  if (!value) {
    return true;
  }

  try {
    const url = new URL(value);

    if (url.protocol !== "https:") {
      return "YouTube links must use HTTPS.";
    }

    const hostname = url.hostname.toLowerCase();

    const isYouTubeHost =
      hostname === "youtube.com" ||
      hostname.endsWith(".youtube.com") ||
      hostname === "youtu.be";

    return isYouTubeHost
      ? true
      : "Enter a valid YouTube URL.";
  } catch {
    return "Enter a valid YouTube URL.";
  }
};

export const BlogPosts: CollectionConfig = {
  slug: "blog-posts",

  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },

  admin: {
    useAsTitle: "title",
    defaultColumns: [
      "title",
      "author",
      "publishedAt",
      "status",
      "updatedAt",
    ],
    group: "Business",
    description:
      "Blog posts displayed on the website. Only published posts appear publicly.",
  },

  labels: {
    singular: "Blog Post",
    plural: "Blog Posts",
  },

  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Post Title",
    },

    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      label: "URL Slug",
      admin: {
        description:
          "Use lowercase words separated by hyphens. Example: how-to-plan-a-renovation.",
      },
      validate: validateSlug,
    },

    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Cover Image",
      filterOptions: {
        mimeType: {
          in: [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/avif",
          ],
        },
      },
      admin: {
        description:
          "Required square image used on the blog listing and as the main article image.",
      },
    },

    {
      name: "publishedAt",
      type: "date",
      required: true,
      label: "Publication Date",
      index: true,
      admin: {
        date: {
          pickerAppearance: "dayOnly",
          displayFormat: "dd/MM/yyyy",
        },
        description:
          "The date displayed on the individual blog post page.",
      },
    },

    {
      name: "author",
      type: "text",
      required: true,
      label: "Author",
      admin: {
        description:
          "The name displayed after the article author label.",
      },
    },

    {
      name: "content",
      type: "richText",
      required: true,
      label: "Article Content",
      admin: {
        description:
          "Write the complete blog post here. This content appears only on the individual article page.",
      },
    },

    {
      name: "mediaType",
      type: "select",
      required: true,
      defaultValue: "none",
      label: "Optional External Media",
      options: [
        {
          label: "No External Media",
          value: "none",
        },
        {
          label: "Instagram Post or Reel",
          value: "instagram",
        },
        {
          label: "YouTube Video",
          value: "youtube",
        },
      ],
      admin: {
        description:
          "Choose whether this article includes an optional Instagram or YouTube link.",
      },
    },

    {
      name: "instagramUrl",
      type: "text",
      label: "Instagram Post or Reel URL",
      admin: {
        condition: (_, siblingData: BlogPostSiblingData) =>
          siblingData.mediaType === "instagram",
        description:
          "Paste the original public Instagram Post or Reel URL.",
      },
      validate: (
        value: string | null | undefined,
        {
          siblingData,
        }: {
          siblingData?: BlogPostSiblingData;
        },
      ): true | string => {
        if (siblingData?.mediaType !== "instagram") {
          return true;
        }

        if (!value) {
          return "Enter an Instagram URL when Instagram is selected.";
        }

        return validateInstagramUrl(value);
      },
    },

    {
      name: "youtubeUrl",
      type: "text",
      label: "YouTube Video URL",
      admin: {
        condition: (_, siblingData: BlogPostSiblingData) =>
          siblingData.mediaType === "youtube",
        description:
          "Paste a public YouTube video or Shorts URL.",
      },
      validate: (
        value: string | null | undefined,
        {
          siblingData,
        }: {
          siblingData?: BlogPostSiblingData;
        },
      ): true | string => {
        if (siblingData?.mediaType !== "youtube") {
          return true;
        }

        if (!value) {
          return "Enter a YouTube URL when YouTube is selected.";
        }

        return validateYouTubeUrl(value);
      },
    },

    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "draft",
      label: "Published Status",
      index: true,
      admin: {
        position: "sidebar",
        description:
          "Only published posts appear on the website.",
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
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      label: "Featured Post",
      admin: {
        position: "sidebar",
        description:
          "Reserved for highlighting selected posts later.",
      },
    },

    {
      name: "order",
      type: "number",
      defaultValue: 0,
      label: "Display Order",
      admin: {
        position: "sidebar",
        description:
          "Lower numbers appear first. Posts with the same number can later be sorted by publication date.",
      },
    },
  ],
};