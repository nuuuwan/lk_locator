import React from "react";
import { Polygon } from "react-leaflet";

export default function MultiPolygonView({ multiPolygon, color = "blue", fillOpacity = 0.2 }) {
  if (!multiPolygon || !multiPolygon.polygons || multiPolygon.polygons.length === 0) {
    return null;
  }

  return (
    <>
      {multiPolygon.polygons.map((polygon, index) => {
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
