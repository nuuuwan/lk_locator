import AbstractLegacyRegion from "./AbstractLegacyRegion";

export default class District extends AbstractLegacyRegion {
  static get regionName() {
    return "Local Authority";
  }

  static get regionShortName() {
    return "LG";
  }
}
