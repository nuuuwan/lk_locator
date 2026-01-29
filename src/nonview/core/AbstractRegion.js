import LatLng from "../base/LatLng";
import MultiPolygon from "../base/MultiPolygon";
import Cache from "../base/Cache";

export default class AbstractRegion {
  constructor({ id, name, nameSi, nameTa, areaSqKm, centerLatLng }) {
    this.id = id;
    this.name = name;
    this.nameSi = nameSi;
    this.nameTa = nameTa;
    this.areaSqKm = areaSqKm;
    this.centerLatLng = centerLatLng;
  }

  static get regionName() {
    throw new Error("regionName must be implemented in subclass");
  }

  static get regionShortName() {
    return this.regionName;
  }

  get regionName() {
    return this.constructor.regionName;
  }

  get regionShortName() {
    return this.constructor.regionShortName;
  }

  static fromObject(data) {
    const centerLatLng = data.centerLatLng
      ? LatLng.fromObject(data.centerLatLng)
      : null;

    return new this({
      ...data,
      centerLatLng,
    });
  }

  static fromAPIObject(apiData) {
    // Convert API format to internal format
    return this.fromObject({
      id: apiData.id,
      name: apiData.name,
      nameSi: apiData.name_si,
      nameTa: apiData.name_ta,
      areaSqKm: apiData.area_sqkm,
      centerLatLng:
        apiData.center_lat && apiData.center_lon
          ? { lat: apiData.center_lat, lng: apiData.center_lon }
          : null,
    });
  }

  static async listAll() {
    const regionShortName = this.regionShortName.toLowerCase();
    const cacheKey = `regions:${regionShortName}s`;

    const cachedData = await Cache.get(cacheKey, async () => {
      const url =
        `https://raw.githubusercontent.com` +
        `/nuuuwan/lk_admin_regions/refs/heads/main` +
        `/data/ents/${regionShortName}s.json`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch ${this.regionName}s: ${response.statusText}`,
          );
        }
        const data = await response.json();
        console.debug(`[${this.regionName}] Loaded ${data.length} regions`);
        return data; // Return plain data for caching
      } catch (error) {
        console.error(`Error fetching ${this.regionName}s:`, error);
        return [];
      }
    });

    // Convert cached plain data to region instances
    return cachedData.map((item) => this.fromAPIObject(item));
  }

  toObject() {
    return {
      id: this.id,
      name: this.name,
      nameSi: this.nameSi,
      nameTa: this.nameTa,
      areaSqKm: this.areaSqKm,
      centerLatLng: this.centerLatLng?.toObject(),
    };
  }

  async getGeo() {
    const regionShortName = this.constructor.regionShortName.toLowerCase();
    const cacheKey = `geo:${regionShortName}:${this.id}`;

    const cachedData = await Cache.get(cacheKey, async () => {
      const url =
        `https://raw.githubusercontent.com` +
        `/nuuuwan/lk_admin_regions/refs/heads/main` +
        `/data/geo/json/small/${regionShortName}s.json/${this.id}.json`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch geo data for ${this.name}: ${response.statusText}`,
          );
        }
        const data = await response.json();
        console.debug(
          `[${this.regionName}] Loaded geo for ${this.name}: ${data.length} polygon(s)`,
        );
        return data; // Return plain array data for caching
      } catch (error) {
        console.error(`Error fetching geo data for ${this.name}:`, error);
        return [];
      }
    });

    // Convert cached plain data to MultiPolygon instance
    return MultiPolygon.fromArray(cachedData);
  }

  async isInside(latLng) {
    const multiPolygon = await this.getGeo();
    return multiPolygon.isInside(latLng);
  }

  static async find(latLng) {
    // Get all instances of this region type
    const regions = await this.listAll();

    // Sort regions by distance to the latLng (closest first)
    const sortedRegions = regions
      .filter((region) => region.centerLatLng)
      .sort((a, b) => {
        const distA = a.centerLatLng.distance(latLng);
        const distB = b.centerLatLng.distance(latLng);
        return distA - distB;
      });

    // Check each region (in order of proximity) if the latLng is inside it
    for (const region of sortedRegions) {
      const isInside = await region.isInside(latLng);
      if (isInside) {
        return region;
      }
    }

    // No match found
    return null;
  }
}
