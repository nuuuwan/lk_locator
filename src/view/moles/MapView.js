import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
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

export default function MapView({ latLng = LatLng.DEFAULT }) {
  const position = latLng.toArray();

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
        <MapCenterController latLng={latLng} />
      </MapContainer>
    </Box>
  );
}
