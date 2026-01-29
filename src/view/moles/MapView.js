import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Box, IconButton } from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import LatLng from "../../nonview/base/LatLng";
import Crosshairs from "../atoms/Crosshairs";
import MultiPolygonView from "../atoms/MultiPolygonView";

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

export default function MapView({
  latLng = LatLng.DEFAULT,
  onLatLngChange,
  provinceGeo,
}) {
  const position = latLng.toArray();

  const handleLocateClick = async () => {
    if (onLatLngChange) {
      const browserLatLng = await LatLng.fromBrowserLocation();
      onLatLngChange(browserLatLng);
    }
  };

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
        <MapCenterController latLng={latLng} />
        {onLatLngChange && <MapEventHandler onLatLngChange={onLatLngChange} />}
        {provinceGeo && <MultiPolygonView multiPolygon={provinceGeo} />}
      </MapContainer>
      <Crosshairs />
      <Box
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
          zIndex: 2000,
        }}
      >
        <IconButton
          color="primary"
          onClick={handleLocateClick}
          sx={{
            backgroundColor: "white",
            boxShadow: 2,
            "&:hover": {
              backgroundColor: "grey.100",
            },
          }}
        >
          <MyLocationIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
