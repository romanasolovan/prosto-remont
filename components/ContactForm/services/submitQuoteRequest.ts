import type { FormValues } from "../types";

export async function submitQuoteRequest(values: FormValues) {
  const formData = new FormData();

  formData.append("fullName", values.fullName);
  formData.append("phone", values.phone);
  formData.append("email", values.email);
  formData.append("interestedIn", values.interestedIn);
  formData.append("renovationType", values.renovationType);
  formData.append("renovationObject", values.renovationObject);
  formData.append("workDescription", values.workDescription);
  formData.append("startDate", values.startDate);
  formData.append("location", values.location);
  formData.append("additionalComments", values.additionalComments);

  values.attachments.forEach((file) => {
    formData.append("attachments", file);
  });

  const response = await fetch("/api/request-quote", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to submit quote request");
  }

  return response;
}
