export const MAX_ATTACHMENTS = 10;

export const MAX_TOTAL_ATTACHMENT_SIZE = 4 * 1024 * 1024;

export const ALLOWED_ATTACHMENT_MIME_TYPES: readonly string[] = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const ALLOWED_ATTACHMENT_EXTENSIONS =
  ".pdf,.jpg,.jpeg,.png,.docx";