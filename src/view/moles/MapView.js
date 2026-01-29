import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Box } from "@mui/material";

export default function MapView() {
  // Center of Sri Lanka
  const position = [7.8731, 80.7718];

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <MapContainer
        center={position}
        zoom={8}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </Box>
  );
}
