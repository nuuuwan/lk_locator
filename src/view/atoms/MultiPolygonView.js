import React from "react";
import { Polygon } from "react-leaflet";

export default function MultiPolygonView({
  multiPolygon,
  geoData,
  color = "blue",
  fillOpacity = 0.5,
}) {
  // Support both prop names for backwards compatibility
  const data = multiPolygon || geoData;

  if (!data || !data.polygons || data.polygons.length === 0) {
    return null;
  }

  return (
    <>
      {data.polygons.map((polygon, index) => {
        // Convert LatLng objects to [lat, lng] arrays for Leaflet
        const positions = polygon.map((latLng) => [latLng.lat, latLng.lng]);

        return (
          <Polygon
            key={index}
            positions={positions}
            pathOptions={{
              color: color,
              fillColor: color,
              fillOpacity: fillOpacity,
              weight: 2,
            }}
          />
        );
      })}
    </>
  );
}
