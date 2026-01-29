import LatLng from "../base/LatLng";

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
      return data.map((item) => this.fromAPIObject(item));
    } catch (error) {
      console.error(`Error fetching ${this.regionName}s:`, error);
      return [];
    }
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
}
