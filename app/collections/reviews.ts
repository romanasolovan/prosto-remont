import type {
  CollectionBeforeValidateHook,
  CollectionConfig,
} from "payload";

type ReviewVideoSource = "none" | "upload" | "instagram";

type ReviewVideoData = {
  videoSource?: ReviewVideoSource | null;
  video?: unknown;
  instagramUrl?: string | null;
  instagramPoster?: unknown;
};

const isReviewVideoSource = (
  value: unknown,
): value is ReviewVideoSource =>
  value === "none" || value === "upload" || value === "instagram";

const hasValue = (value: unknown): boolean =>
  value !== undefined && value !== null && value !== "";

const getReviewVideoSource = ({
  data,
  originalDoc,
}: {
  data: ReviewVideoData;
  originalDoc?: ReviewVideoData;
}): ReviewVideoSource => {
  const incomingSource = data.videoSource;
  const existingSource = originalDoc?.videoSource;

  const existingVideo = originalDoc?.video;
  const incomingVideo = data.video;

  /*
   * Legacy support:
   * Reviews created before videoSource existed may already contain an
   * uploaded video. Preserve that video and classify it as "upload"
   * the first time the document is saved after this schema change.
   */
  const isLegacyUploadedVideo =
    !isReviewVideoSource(existingSource) &&
    hasValue(existingVideo) &&
    (incomingSource === undefined ||
      incomingSource === null ||
      incomingSource === "none");

  if (isLegacyUploadedVideo) {
    return "upload";
  }

  if (isReviewVideoSource(incomingSource)) {
    return incomingSource;
  }

  if (isReviewVideoSource(existingSource)) {
    return existingSource;
  }

  if (hasValue(incomingVideo) || hasValue(existingVideo)) {
    return "upload";
  }

  return "none";
};

const normalizeReviewVideoFields: CollectionBeforeValidateHook = ({
  data,
  originalDoc,
}) => {
  if (!data) {
    return data;
  }

  const reviewData = data as ReviewVideoData;
  const previousReview = originalDoc as ReviewVideoData | undefined;

  const videoSource = getReviewVideoSource({
    data: reviewData,
    originalDoc: previousReview,
  });

  reviewData.videoSource = videoSource;

  if (videoSource === "none") {
  reviewData.video = null;
  reviewData.instagramUrl = null;
  reviewData.instagramPoster = null;
}

if (videoSource === "upload") {
  reviewData.instagramUrl = null;
  reviewData.instagramPoster = null;
}

if (videoSource === "instagram") {
  reviewData.video = null;
}

  return data;
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

    if (url.username || url.password) {
      return "Enter a valid public Instagram Post or Reel URL.";
    }

    const hostname = url.hostname.toLowerCase();

    const isInstagramHost =
      hostname === "instagram.com" ||
      hostname.endsWith(".instagram.com");

    if (!isInstagramHost) {
      return "Enter a valid Instagram URL.";
    }

    const isPostOrReelPath =
  /^\/(?:p|reel|reels)\/[A-Za-z0-9_-]+\/?$/.test(
    url.pathname,
  );

    if (!isPostOrReelPath) {
      return "Enter a public Instagram Post or Reel URL.";
    }

    return true;
  } catch {
    return "Enter a valid Instagram URL.";
  }
};

export const Reviews: CollectionConfig = {
  slug: "reviews",

  access: {
    create: ({ req }) => Boolean(req.user),
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },

  admin: {
    useAsTitle: "name",
    defaultColumns: [
      "name",
      "rating",
      "location",
      "videoSource",
      "status",
      "createdAt",
    ],
    group: "Business",
    description:
      "Client reviews submitted from the website form. Only approved reviews appear publicly.",
  },

  labels: {
    singular: "Review",
    plural: "Reviews",
  },

  hooks: {
    beforeValidate: [normalizeReviewVideoFields],
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
      name: "videoSource",
      type: "select",
      required: true,
      defaultValue: "none",
      label: "Review Video Source",
      options: [
        {
          label: "No Video",
          value: "none",
        },
        {
          label: "Uploaded Video",
          value: "upload",
        },
        {
          label: "Instagram Post or Reel",
          value: "instagram",
        },
      ],
      admin: {
        description:
          "Choose one optional video source. Changing the source clears the previously selected video source.",
      },
    },
    {
      name: "video",
      type: "upload",
      relationTo: "media",
      label: "Uploaded Review Video",
      filterOptions: {
        mimeType: {
          in: ["video/mp4", "video/webm"],
        },
      },
      admin: {
        condition: (_, siblingData) =>
          siblingData.videoSource === "upload",
        description:
          "Select or upload one MP4 or WebM video. Maximum file size: 50 MB.",
      },
      
      validate: (
  value: unknown,
  { siblingData }: { siblingData?: ReviewVideoData },
): true | string => {
  if (siblingData?.videoSource !== "upload") {
    return true;
  }

  return hasValue(value)
    ? true
    : "Select an uploaded video when the video source is Uploaded Video.";
      },
    },
    {
      name: "instagramUrl",
      type: "text",
      label: "Instagram Post or Reel URL",
      admin: {
        condition: (_, siblingData) =>
          siblingData.videoSource === "instagram",
        description:
          "Paste the original public Instagram Post or Reel URL. Do not paste embed code, iframe HTML, or a temporary media URL.",
      },
      validate: (
  value: string | null | undefined,
  { siblingData }: { siblingData?: ReviewVideoData },
): true | string => {
  if (siblingData?.videoSource !== "instagram") {
    return true;
  }

  if (!value) {
    return "Enter an Instagram URL when the video source is Instagram Post or Reel.";
  }

  return validateInstagramUrl(value);
      },
    },
    {
  name: "instagramPoster",
  type: "upload",
  relationTo: "media",
  label: "Instagram Video Preview Image",
  filterOptions: {
    mimeType: {
      in: ["image/jpeg", "image/png", "image/webp"],
    },
  },
  admin: {
    condition: (_, siblingData) =>
      siblingData.videoSource === "instagram",
    description:
      "Upload or select a screenshot from the Instagram video. This image is shown on the review card; the original Instagram post opens in the video modal.",
  },
  validate: (
    value: unknown,
    { siblingData }: { siblingData?: ReviewVideoData },
  ): true | string => {
    if (siblingData?.videoSource !== "instagram") {
      return true;
    }

    return hasValue(value)
      ? true
      : "Select a preview image for the Instagram video review.";
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

          const isAllowedHost = allowedHosts.some(
            (host) =>
              url.hostname === host ||
              url.hostname.endsWith(`.${host}`),
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