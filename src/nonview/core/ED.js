import AbstractRegion from "./AbstractRegion";

export default class District extends AbstractRegion {
  static get regionName() {
    return "Electoral District";
  }

  static get regionShortName() {
    return "ED";
  }
}
