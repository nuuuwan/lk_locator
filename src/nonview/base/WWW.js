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

  static async fetchTSV(url) {
    const cacheKey = `www:${url}`;

    const data = await Cache.get(cacheKey, async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
        }
        const text = await response.text();

        // Parse TSV - remove carriage returns and split by newlines
        const lines = text.replace(/\r/g, "").trim().split("\n");
        if (lines.length === 0) {
          return [];
        }

        // First line is headers
        const headers = lines[0].split("\t");

        // Parse remaining lines as data rows
        const rows = lines.slice(1).map((line) => {
          const values = line.split("\t");
          const obj = {};
          headers.forEach((header, index) => {
            obj[header] = values[index];
          });
          return obj;
        });

        return rows;
      } catch (error) {
        console.error(`Error fetching ${url}:`, error);
        throw error;
      }
    });

    return data;
  }
}
