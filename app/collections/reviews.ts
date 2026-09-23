import type {
  CollectionBeforeValidateHook,
  CollectionConfig,
} from "payload";

import { reviewFields } from "./reviews/reviewFields";

type ReviewType = "written" | "video";

type ReviewData = {
  reviewType?: ReviewType | null;
  videoSource?: "none" | "upload" | "instagram" | null;
  video?: unknown;
};

const getReviewType = ({
  data,
  originalDoc,
}: {
  data: ReviewData;
  originalDoc?: ReviewData;
}): ReviewType => {
  if (
    data.reviewType === "written" ||
    data.reviewType === "video"
  ) {
    return data.reviewType;
  }

  if (
    originalDoc?.reviewType === "written" ||
    originalDoc?.reviewType === "video"
  ) {
    return originalDoc.reviewType;
  }

  const legacyVideoSource =
    data.videoSource ?? originalDoc?.videoSource;

  const video = data.video ?? originalDoc?.video;

  if (
    legacyVideoSource === "upload" ||
    (video !== undefined &&
      video !== null &&
      video !== "")
  ) {
    return "video";
  }

  return "written";
};

const normalizeReviewType: CollectionBeforeValidateHook = ({
  data,
  originalDoc,
}) => {
  if (!data) {
    return data;
  }

  const reviewData = data as ReviewData;
  const previousReview =
    originalDoc as ReviewData | undefined;

  reviewData.reviewType = getReviewType({
    data: reviewData,
    originalDoc: previousReview,
  });

  return data;
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
      "reviewType",
      "rating",
      "location",
      "status",
      "createdAt",
    ],
    group: "Business",
    description:
      "Manage written and video client reviews. Only approved reviews appear publicly.",
  },

  labels: {
    singular: "Review",
    plural: "Reviews",
  },

  hooks: {
    beforeValidate: [normalizeReviewType],
  },

  fields: reviewFields,
};