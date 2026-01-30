import LatLng from "../base/LatLng";
import MultiPolygon from "../base/MultiPolygon";
import Cache from "../base/Cache";
import WWW from "../base/WWW";

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

  static get url() {
    const regionShortName = this.regionShortName.toLowerCase();
    return (
      `https://raw.githubusercontent.com` +
      `/nuuuwan/lk_admin_regions/refs/heads/main` +
      `/data/ents/${regionShortName}s.tsv`
    );
  }

  static async listAll() {
    const url = this.url;
    try {
      const data = await WWW.fetchTSV(url);
      const regions = data.map((item) => this.fromAPIObject(item));
      return regions;
    } catch (error) {
      console.error(`Error fetching ${this.regionName}s:`, error);
      return [];
    }
  }

  static async idx() {
    const regions = await this.listAll();
    return Object.fromEntries(regions.map((region) => [region.id, region]));
  }

  static async fromID(id) {
    const regionsIdx = await this.idx();
    return regionsIdx[id] || null;
  }

  get geoUrl() {
    const regionShortName = this.constructor.regionShortName.toLowerCase();

    return (
      `https://raw.githubusercontent.com` +
      `/nuuuwan/lk_admin_regions/refs/heads/main` +
      `/data/geo/json/small/${regionShortName}s.json/${this.id}.json`
    );
  }

  async getGeo() {
    const regionShortName = this.constructor.regionShortName.toLowerCase();
    const cacheKey = `geo:${regionShortName}:${this.id}`;

    const cachedData = await Cache.get(cacheKey, async () => {
      const url = this.geoUrl;
      try {
        const data = await WWW.fetchJSON(url);
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

  isParent(parentRegion) {
    if (!parentRegion) {
      return false;
    }
    return this.id.startsWith(parentRegion.id);
  }

  static async find(latLng, parentRegion = null) {
    // Get all instances of this region type
    const regions = await this.listAll();

    // Filter by parent region if provided
    const filteredRegions = parentRegion
      ? regions.filter((region) => region.isParent(parentRegion))
      : regions;

    // Sort regions by distance to the latLng (closest first)
    const sortedRegions = filteredRegions
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

    // If no match is found, return the closest region.
    return filteredRegions[0];
  }
}
