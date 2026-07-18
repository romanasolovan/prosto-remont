import type { CollectionBeforeValidateHook, CollectionConfig } from "payload";
import { APIError } from "payload";

const MAX_MEDIA_FILE_SIZE = 50 * 1024 * 1024;

const validateMediaFileSize: CollectionBeforeValidateHook = ({ data, req }) => {
  const uploadedFileSize =
    req.file?.size ??
    (typeof data?.filesize === "number" ? data.filesize : undefined);

  if (
    typeof uploadedFileSize === "number" &&
    uploadedFileSize > MAX_MEDIA_FILE_SIZE
  ) {
    throw new APIError("The maximum allowed upload size is 50 MB.", 400);
  }

  return data;
};

export const Media: CollectionConfig = {
  slug: "media",

  access: {
    read: () => true,
  },

  admin: {
    useAsTitle: "filename",
    defaultColumns: ["filename", "mimeType", "filesize", "updatedAt"],
    description:
      "Images and videos used across projects, reviews, trusted brands, partners, and other website content.",
  },

  hooks: {
    beforeValidate: [validateMediaFileSize],
  },

  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      label: "Alternative Text",
      admin: {
        description:
          "Describe the image or video for accessibility and administration.",
      },
    },
  ],

  upload: {
    mimeTypes: [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/avif",
      "image/gif",
      "image/svg+xml",
      "video/mp4",
      "video/webm",
    ],
  },
};
