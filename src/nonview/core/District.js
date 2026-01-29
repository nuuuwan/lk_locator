import AbstractRegion from "./AbstractRegion";

export default class District extends AbstractRegion {
  static get regionTypeName() {
    return "District";
  }
}
