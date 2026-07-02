import AbstractRegion from "./AbstractRegion";

export default class PD extends AbstractRegion {
  static get regionName() {
    return "Polling Division";
  }

  static get regionShortName() {
    return "PD";
  }
}
