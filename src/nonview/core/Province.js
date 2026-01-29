import AbstractRegion from "./AbstractRegion";

export default class Province extends AbstractRegion {
  static get regionTypeName() {
    return "Province";
  }
}
