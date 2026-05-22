export async function getProjects() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/public/projects`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }

    const data = await response.json();

    return data.projects || [];
  } catch (error) {
    console.error("Projects fetch failed:", error);

    return [];
  }
}
