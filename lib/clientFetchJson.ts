export async function clientFetchJson<T>(
  url: string,
  fallback: T,
  retries = 2,
): Promise<T> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (attempt === retries) {
        console.error(`Failed to fetch ${url}:`, error);
        return fallback;
      }

      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  return fallback;
}
