import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Box } from "@mui/material";
import LatLng from "../../nonview/base/LatLng";
import Crosshairs from "../atoms/Crosshairs";
import { useData } from "../../nonview/core/DataContext";
import MultiPolygonView from "../atoms/MultiPolygonView";

function MapCenterController({ latLng, isProgrammaticUpdate }) {
  const map = useMap();

  useEffect(() => {
    if (latLng) {
      isProgrammaticUpdate.current = true;
      map.setView(latLng.toArray(), map.getZoom());
      // Reset flag after a short delay
      setTimeout(() => {
        isProgrammaticUpdate.current = false;
      }, 100);
    }
  }, [latLng, map, isProgrammaticUpdate]);

  return null;
}

function MapEventHandler({ onLatLngChange, isProgrammaticUpdate }) {
  const map = useMapEvents({
    moveend: () => {
      // Ignore moveend events triggered by programmatic updates
      if (isProgrammaticUpdate.current) {
        return;
      }

      const center = map.getCenter();
      const newLatLng = new LatLng(center.lat, center.lng);

      // Check if location is within Sri Lanka bounds
      if (!newLatLng.isWithinSriLankaBounds()) {
        // Constrain to bounds
        const constrainedLatLng = newLatLng.constrainToSriLankaBounds();
        onLatLngChange(constrainedLatLng);
      } else {
        onLatLngChange(newLatLng);
      }
    },
  });

  return null;
}

export default function MapView() {
  const { latLng, onLatLngChange, gnd, gndGeo } = useData();
  const position = latLng.toArray();
  const isProgrammaticUpdate = useRef(false);

  return (
    <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
      <MapContainer
        center={position}
        zoom={12}
        zoomControl={false}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapCenterController
          latLng={latLng}
          isProgrammaticUpdate={isProgrammaticUpdate}
        />
        {onLatLngChange && (
          <MapEventHandler
            onLatLngChange={onLatLngChange}
            isProgrammaticUpdate={isProgrammaticUpdate}
          />
        )}
        <MultiPolygonView
          geoData={gndGeo}
          label={gnd ? gnd.name + " " + gnd.regionName : null}
        />
      </MapContainer>
      <Crosshairs />
    </Box>
  );
}
