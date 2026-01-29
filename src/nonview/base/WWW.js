import Cache from "./Cache";

export default class WWW {
  static async fetchJSON(url) {
    const cacheKey = `www:${url}`;

    const data = await Cache.get(cacheKey, async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
        }
        return await response.json();
      } catch (error) {
        console.error(`Error fetching ${url}:`, error);
        throw error;
      }
    });

    return data;
  }
}
