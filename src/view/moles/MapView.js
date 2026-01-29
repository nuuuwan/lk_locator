import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Box } from "@mui/material";
import LatLng from "../../nonview/base/LatLng";

function MapCenterController({ latLng }) {
  const map = useMap();

  useEffect(() => {
    if (latLng) {
      map.setView(latLng.toArray(), map.getZoom());
    }
  }, [latLng, map]);

  return null;
}

function MapEventHandler({ onLatLngChange }) {
  const map = useMapEvents({
    moveend: () => {
      const center = map.getCenter();
      const newLatLng = new LatLng(center.lat, center.lng);
      onLatLngChange(newLatLng);
    },
  });

  return null;
}

export default function MapView({ latLng = LatLng.DEFAULT, onLatLngChange }) {
  const position = latLng.toArray();

  return (
    <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
      <MapContainer
        center={position}
        zoom={8}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapCenterController latLng={latLng} />
        {onLatLngChange && <MapEventHandler onLatLngChange={onLatLngChange} />}
      </MapContainer>
      {/* Crosshairs */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 1000,
        }}
      >
        <Box
          sx={{
            width: "40px",
            height: "40px",
            position: "relative",
          }}
        >
          {/* Horizontal line */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: 0,
              right: 0,
              height: "2px",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              transform: "translateY(-50%)",
            }}
          />
          {/* Vertical line */}
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: "2px",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              transform: "translateX(-50%)",
            }}
          />
          {/* Center circle */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "8px",
              height: "8px",
              border: "2px solid rgba(0, 0, 0, 0.5)",
              borderRadius: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              transform: "translate(-50%, -50%)",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
