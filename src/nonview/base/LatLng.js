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
    const latDir = this.lat >= 0 ? "N" : "S";
    const lngDir = this.lng >= 0 ? "E" : "W";
    return `${Math.abs(this.lat).toFixed(4)}${latDir},${Math.abs(this.lng).toFixed(4)}${lngDir}`;
  }

  static fromString(str) {
    // Parse format like "7.8731N,80.7718E"
    const match = str.match(/^([0-9.]+)([NS]),([0-9.]+)([EW])$/);
    if (!match) {
      return null;
    }
    const lat = parseFloat(match[1]) * (match[2] === "N" ? 1 : -1);
    const lng = parseFloat(match[3]) * (match[4] === "E" ? 1 : -1);
    return new LatLng(lat, lng);
  }

  toObject() {
    return { lat: this.lat, lng: this.lng };
  }

  // Default center of Sri Lanka
  static get DEFAULT() {
    return new LatLng(7.8731, 80.7718);
  }

  // Get LatLng from browser geolocation
  static async fromBrowserLocation() {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(LatLng.DEFAULT);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(
            new LatLng(position.coords.latitude, position.coords.longitude),
          );
        },
        () => {
          // On error, fallback to default
          resolve(LatLng.DEFAULT);
        },
        {
          timeout: 5000,
          maximumAge: 60000,
        },
      );
    });
  }
}
