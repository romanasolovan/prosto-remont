import type { PublicService } from "@/types/services";

export async function getServices(): Promise<PublicService[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/public/services`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch services");
    }

    const data = await response.json();

    return data.services || [];
  } catch (error) {
    console.error("Failed to load services:", error);

    return [];
  }
}
