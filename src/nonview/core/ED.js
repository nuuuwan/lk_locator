import AbstractLegacyRegion from "./AbstractLegacyRegion";

export default class District extends AbstractLegacyRegion {
  static get regionName() {
    return "Electoral District";
  }

  static get regionShortName() {
    return "ED";
  }
}
