export default class LatLng {
  // Sri Lanka bounding box coordinates
  static BOUNDS = {
    MIN_LAT: 5.9, // Southern tip
    MAX_LAT: 9.9, // Northern tip
    MIN_LNG: 79.5, // Western edge
    MAX_LNG: 81.95, // Eastern edge
  };

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

  // Calculate distance to another LatLng in kilometers using Haversine formula
  distance(otherLatLng) {
    const R = 6371; // Earth's radius in kilometers
    const lat1 = (this.lat * Math.PI) / 180;
    const lat2 = (otherLatLng.lat * Math.PI) / 180;
    const deltaLat = ((otherLatLng.lat - this.lat) * Math.PI) / 180;
    const deltaLng = ((otherLatLng.lng - this.lng) * Math.PI) / 180;

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) *
        Math.cos(lat2) *
        Math.sin(deltaLng / 2) *
        Math.sin(deltaLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }

  // Check if coordinates are within Sri Lanka bounds
  isWithinSriLankaBounds() {
    return (
      this.lat >= LatLng.BOUNDS.MIN_LAT &&
      this.lat <= LatLng.BOUNDS.MAX_LAT &&
      this.lng >= LatLng.BOUNDS.MIN_LNG &&
      this.lng <= LatLng.BOUNDS.MAX_LNG
    );
  }

  // Constrain coordinates to Sri Lanka bounds
  constrainToSriLankaBounds() {
    const lat = Math.max(
      LatLng.BOUNDS.MIN_LAT,
      Math.min(LatLng.BOUNDS.MAX_LAT, this.lat),
    );
    const lng = Math.max(
      LatLng.BOUNDS.MIN_LNG,
      Math.min(LatLng.BOUNDS.MAX_LNG, this.lng),
    );
    return new LatLng(lat, lng);
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
