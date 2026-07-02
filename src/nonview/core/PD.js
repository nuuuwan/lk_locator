import AbstractRegion from "./AbstractRegion";

export default class PollingDivision extends AbstractRegion {
  static get regionName() {
    return "Polling Division";
  }

  static get regionShortName() {
    return "PD";
  }
}
