export default class LatLng {
  constructor(lat, lng) {
    this.lat = lat;
    this.lng = lng;
  }

  static fromObject({ lat, lng }) {
    return new LatLng(lat, lng);
  }

  toArray() {
    return [this.lat, this.lng];
  }

  toString() {
    return `${this.lat.toFixed(6)}, ${this.lng.toFixed(6)}`;
  }

  toObject() {
    return { lat: this.lat, lng: this.lng };
  }

  // Default center of Sri Lanka
  static get DEFAULT() {
    return new LatLng(7.8731, 80.7718);
  }
}
