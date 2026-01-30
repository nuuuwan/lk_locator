import AbstractLegacyRegion from "./AbstractLegacyRegion";

export default class District extends AbstractLegacyRegion {
  static get regionName() {
    return "Polling Division";
  }

  static get regionShortName() {
    return "PD";
  }
}
