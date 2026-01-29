import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import MapView from "../moles/MapView";
import DetailsView from "../moles/DetailsView";
import LatLng from "../../nonview/base/LatLng";

export default function HomePage() {
  const { latlng } = useParams();
  const navigate = useNavigate();

  // Initialize latLng from URL params or use browser location
  const parsedLatLng = latlng ? LatLng.fromString(latlng) : null;
  const [latLng, setLatLng] = useState(parsedLatLng || LatLng.DEFAULT);
  const [initialized, setInitialized] = useState(!!parsedLatLng);

  useEffect(() => {
    // If no valid latlng from URL, get browser location
    if (!initialized) {
      LatLng.fromBrowserLocation().then((browserLatLng) => {
        setLatLng(browserLatLng);
        navigate(`/lk_locator/${browserLatLng.toString()}`, { replace: true });
        setInitialized(true);
      });
    }
  }, [initialized, navigate]);

  useEffect(() => {
    // Update document title when latLng changes
    document.title = latLng.toString();
  }, [latLng]);

  const handleLatLngChange = (newLatLng) => {
    setLatLng(newLatLng);
    navigate(`/lk_locator/${newLatLng.toString()}`, { replace: true });
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
        <DetailsView latLng={latLng} onLocate={handleLatLngChange} />
      </Box>
    </Box>
  );
}
