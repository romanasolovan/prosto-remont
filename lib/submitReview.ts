export type ReviewSubmission = {
  name: string;
  rating: number;
  comment: string;
  location: string;
  photo: File | null;
};

export async function submitReview(
  data: ReviewSubmission,
): Promise<void> {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("rating", String(data.rating));
  formData.append("comment", data.comment);
  formData.append("location", data.location);

  if (data.photo) {
    formData.append("photo", data.photo);
  }

  const response = await fetch(
    "/api/submit-review",
    {
      method: "POST",
      body: formData,
    },
  );

  if (!response.ok) {
    throw new Error("Failed to submit review");
  }
}