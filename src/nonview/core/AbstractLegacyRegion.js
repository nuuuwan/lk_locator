import AbstractRegion from "./AbstractRegion";
import LatLng from "../base/LatLng";

export default class AbstractLegacyRegion extends AbstractRegion {
  static fromAPIObject(apiData) {
    // Convert API format to internal format
    const centroid = JSON.parse(apiData.centroid);
    return this.fromObject({
      id: apiData.id,
      name: apiData.name,
      nameSi: undefined,
      nameTa: undefined,
      areaSqKm: undefined,
      centerLatLng: new LatLng(centroid[0], centroid[1]),
    });
  }

  static get url() {
    const regionShortName = this.regionShortName.toLowerCase();
    return (
      `https://raw.githubusercontent.com` +
      `/nuuuwan/gig-data/refs/heads/master/ents/${regionShortName}.tsv`
    );
  }

  get geoUrl() {
    const regionShortName = this.constructor.regionShortName.toLowerCase();
    return (
      `https://raw.githubusercontent.com` +
      `/nuuuwan/gig-data/refs/heads/master` +
      `/geo/${regionShortName}/${this.id}.json`
    );
  }
}
