import AbstractRegion from "./AbstractRegion";

export default class District extends AbstractRegion {
  static get regionName() {
    return "Local Authority";
  }

  static get regionShortName() {
    return "LG";
  }
}
