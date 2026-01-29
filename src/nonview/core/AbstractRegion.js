import LatLng from "../base/LatLng";

export default class AbstractRegion {
  constructor({ id, name, nameSi, nameTa, areaSqKm, centerLatLng }) {
    this.id = id;
    this.name = name;
    this.nameSi = nameSi;
    this.nameTa = nameTa;
    this.areaSqKm = areaSqKm;
    this.centerLatLng = centerLatLng;
  }

  static get regionName() {
    throw new Error("regionName must be implemented in subclass");
  }

  static get regionShortName() {
    return this.regionName;
  }

  get regionName() {
    return this.constructor.regionName;
  }

  get regionShortName() {
    return this.constructor.regionShortName;
  }

  static fromObject(data) {
    const centerLatLng = data.centerLatLng
      ? LatLng.fromObject(data.centerLatLng)
      : null;

    return new this({
      ...data,
      centerLatLng,
    });
  }

  toObject() {
    return {
      id: this.id,
      name: this.name,
      nameSi: this.nameSi,
      nameTa: this.nameTa,
      areaSqKm: this.areaSqKm,
      centerLatLng: this.centerLatLng?.toObject(),
    };
  }
}
