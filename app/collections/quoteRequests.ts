import type { CollectionConfig } from "payload";

export const QuoteRequests: CollectionConfig = {
  slug: "quote-requests",

  access: {
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },

  admin: {
    useAsTitle: "fullName",
    defaultColumns: [
      "fullName",
      "phone",
      "interestedIn",
      "status",
      "createdAt",
    ],
    group: "Business",
  },

  fields: [
    {
      name: "fullName",
      type: "text",
      required: true,
      label: "Full Name",
    },
    {
      name: "phone",
      type: "text",
      required: true,
      label: "Phone Number",
    },
    {
      name: "email",
      type: "email",
      required: true,
      label: "Email",
    },
    {
      name: "interestedIn",
      type: "select",
      required: true,
      label: "Interested In",
      options: [
        { label: "New construction", value: "newConstruction" },
        { label: "Renovation", value: "renovation" },
      ],
    },
    {
      name: "renovationType",
      type: "select",
      required: true,
      label: "Renovation Type",
      options: [
        { label: "Turnkey without project", value: "turnkeyNoProject" },
        { label: "Turnkey with project", value: "turnkeyWithProject" },
        { label: "Refresh", value: "refresh" },
        { label: "Repairs", value: "repairs" },
      ],
    },
    {
      name: "renovationObject",
      type: "select",
      required: true,
      label: "Renovation Object",
      options: [
        { label: "House", value: "house" },
        { label: "Apartment", value: "apartment" },
        { label: "Service space", value: "serviceSpace" },
        { label: "Office", value: "office" },
        { label: "Bathroom", value: "bathroom" },
        { label: "Room", value: "room" },
      ],
    },
    {
      name: "workDescription",
      type: "text",
      label: "Work Description",
    },
    {
      name: "attachments",
      type: "relationship",
      relationTo: "media",
      hasMany: true,
      label: "Attachments",
    },
    {
      name: "startDate",
      type: "date",
      required: true,
      label: "Preferred Start Date",
    },
    {
      name: "location",
      type: "text",
      required: true,
      label: "Location",
    },
    {
      name: "additionalComments",
      type: "textarea",
      label: "Additional Comments",
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "new",
      label: "Status",
      options: [
        { label: "New", value: "new" },
        { label: "Contacted", value: "contacted" },
        { label: "Estimate Sent", value: "estimate-sent" },
        { label: "Accepted", value: "accepted" },
        { label: "Rejected", value: "rejected" },
        { label: "Completed", value: "completed" },
      ],
    },
    {
      name: "ownerReminderDate",
      type: "date",
      label: "Owner Reminder Date",
    },
    {
      name: "internalNotes",
      type: "textarea",
      label: "Internal Notes",
    },
  ],
};
