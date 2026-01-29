import React, { useState } from "react";
import { Box } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import MapView from "../moles/MapView";
import DetailsView from "../moles/DetailsView";
import LatLng from "../../nonview/base/LatLng";

export default function HomePage() {
  const { lat, lng } = useParams();
  const navigate = useNavigate();

  // Initialize latLng from URL params or use default
  const initialLatLng =
    lat && lng ? new LatLng(parseFloat(lat), parseFloat(lng)) : LatLng.DEFAULT;

  const [latLng, setLatLng] = useState(initialLatLng);

  const handleLatLngChange = (newLatLng) => {
    setLatLng(newLatLng);
    navigate(`/locator/${newLatLng.lat}/${newLatLng.lng}`, { replace: true });
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Map - Top Half */}
      <Box
        sx={{
          flex: 1,
          width: "100%",
        }}
      >
        <MapView latLng={latLng} onLatLngChange={handleLatLngChange} />
      </Box>

      {/* Details Display - Bottom Half */}
      <Box
        sx={{
          flex: 1,
          width: "100%",
        }}
      >
        <DetailsView latLng={latLng} />
      </Box>
    </Box>
  );
}
