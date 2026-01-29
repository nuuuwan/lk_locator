import LatLng from "./LatLng";

export default class MultiPolygon {
  constructor(polygons) {
    // polygons is an array of polygons, where each polygon is an array of LatLng
    this.polygons = polygons;
  }

  static fromArray(data) {
    // data is array of array of [lat, lng]
    const polygons = data.map((polygon) =>
      polygon.map(([lng, lat]) => new LatLng(lat, lng)),
    );
    return new MultiPolygon(polygons);
  }

  toArray() {
    return this.polygons.map((polygon) =>
      polygon.map((latLng) => latLng.toArray()),
    );
  }

  // Ray casting algorithm to check if a point is inside a polygon
  static isPointInPolygon(point, polygon) {
    let inside = false;
    const x = point.lng;
    const y = point.lat;

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i].lng;
      const yi = polygon[i].lat;
      const xj = polygon[j].lng;
      const yj = polygon[j].lat;

      // eslint-disable-next-line no-mixed-operators
      const intersectCondition1 = yi > y !== yj > y;

      const intersectCondition2 = x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
      const intersect = intersectCondition1 && intersectCondition2;

      if (intersect) {
        inside = !inside;
      }
    }

    return inside;
  }

  isInside(latLng) {
    // Point is inside the multipolygon if it's inside any of the polygons
    return this.polygons.some((polygon) =>
      MultiPolygon.isPointInPolygon(latLng, polygon),
    );
  }
}
