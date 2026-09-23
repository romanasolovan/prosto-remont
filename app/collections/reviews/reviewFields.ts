import type { Field } from "payload";

type ReviewType = "written" | "video";

type ReviewSiblingData = {
  reviewType?: ReviewType | null;
};

const hasValue = (value: unknown): boolean =>
  value !== undefined && value !== null && value !== "";

const validateHttpsUrl = (
  value: string | null | undefined,
): true | string => {
  if (!value) {
    return true;
  }

  try {
    const url = new URL(value);

    if (url.protocol !== "https:") {
      return "The link must use HTTPS.";
    }

    if (url.username || url.password) {
      return "Enter a valid public URL.";
    }

    return true;
  } catch {
    return "Enter a valid URL.";
  }
};

const validateGoogleReviewUrl = (
  value: string | null | undefined,
): true | string => {
  if (!value) {
    return true;
  }

  try {
    const url = new URL(value);

    if (url.protocol !== "https:") {
      return "Google review links must use HTTPS.";
    }

    const allowedHosts = [
      "google.com",
      "www.google.com",
      "maps.google.com",
      "goo.gl",
      "g.page",
    ];

    const hostname = url.hostname.toLowerCase();

    const isAllowedHost = allowedHosts.some(
      (host) =>
        hostname === host ||
        hostname.endsWith(`.${host}`),
    );

    return isAllowedHost
      ? true
      : "Enter a valid Google or Google Maps review URL.";
  } catch {
    return "Enter a valid URL.";
  }
};

export const reviewFields: Field[] = [
  {
    name: "reviewType",
    type: "select",
    required: true,
    defaultValue: "written",
    label: "Review Type",
    options: [
      {
        label: "Written Review",
        value: "written",
      },
      {
        label: "Video Review",
        value: "video",
      },
    ],
    admin: {
      description:
        "Choose whether this is a written client review or a video testimonial.",
    },
  },
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
    label: "Review Comment",
    admin: {
      condition: (_, siblingData) =>
        siblingData.reviewType === "written",
      description:
        "Enter the client's written review.",
    },
    validate: (
      value: string | null | undefined,
      {
        siblingData,
      }: {
        siblingData?: ReviewSiblingData;
      },
    ): true | string => {
      if (siblingData?.reviewType !== "written") {
        return true;
      }

      return value?.trim()
        ? true
        : "Enter a review comment for a written review.";
    },
  },
  {
    name: "translations",
    type: "group",
    label: "Website Translations",
    admin: {
      condition: (_, siblingData) =>
        siblingData.reviewType === "written",
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
      {
        label: "English",
        value: "en",
      },
      {
        label: "Polish",
        value: "pl",
      },
      {
        label: "Ukrainian",
        value: "uk",
      },
      {
        label: "Russian",
        value: "ru",
      },
    ],
    admin: {
      condition: (_, siblingData) =>
        siblingData.reviewType === "written",
    },
  },
  {
    name: "photo",
    type: "relationship",
    relationTo: "media",
    label: "Review Photo",
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
      condition: (_, siblingData) =>
        siblingData.reviewType === "written",
      description:
        "Optional image displayed with the written review.",
    },
  },
  {
    name: "googleReviewUrl",
    type: "text",
    label: "Google Review Link",
    admin: {
      condition: (_, siblingData) =>
        siblingData.reviewType === "written",
      description:
        "Optional direct link to the matching review on Google.",
    },
    validate: validateGoogleReviewUrl,
  },
  {
    name: "video",
    type: "upload",
    relationTo: "media",
    label: "Review Video",
    filterOptions: {
      mimeType: {
        in: ["video/mp4", "video/webm"],
      },
    },
    admin: {
      condition: (_, siblingData) =>
        siblingData.reviewType === "video",
      description:
        "Upload or select one MP4 or WebM video. Maximum file size: 50 MB.",
    },
    validate: (
      value: unknown,
      {
        siblingData,
      }: {
        siblingData?: ReviewSiblingData;
      },
    ): true | string => {
      if (siblingData?.reviewType !== "video") {
        return true;
      }

      return hasValue(value)
        ? true
        : "Select a video for a video review.";
    },
  },
  {
    name: "videoCardImage",
    type: "upload",
    relationTo: "media",
    label: "Video Card Image",
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
      condition: (_, siblingData) =>
        siblingData.reviewType === "video",
      description:
        "Optional preview image displayed on the video review card.",
    },
  },
  {
    name: "videoSourceUrl",
    type: "text",
    label: "Video Source Link",
    admin: {
      condition: (_, siblingData) =>
        siblingData.reviewType === "video",
      description:
        "Optional link to the original source, such as the matching Instagram post.",
    },
    validate: validateHttpsUrl,
  },
  {
    name: "videoNote",
    type: "textarea",
    label: "Video Review Note",
    admin: {
      condition: (_, siblingData) =>
        siblingData.reviewType === "video",
      description:
        "Optional short note displayed with the opened video review.",
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
        "Set to Approved to show the review on the website.",
    },
    options: [
      {
        label: "Pending Review",
        value: "pending",
      },
      {
        label: "Approved",
        value: "approved",
      },
      {
        label: "Rejected",
        value: "rejected",
      },
    ],
  },
  {
    name: "featured",
    type: "checkbox",
    defaultValue: false,
    label: "Show as featured review",
    admin: {
      position: "sidebar",
      description:
        "Use this to highlight selected reviews.",
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
];