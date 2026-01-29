import React, { useEffect } from "react";
import { Box } from "@mui/material";
import MapView from "../moles/MapView";
import DetailsView from "../moles/DetailsView";
import { DataProvider, useData } from "../../nonview/core/DataContext";

function HomePageContent() {
  const { latLng } = useData();

  useEffect(() => {
    // Update document title when latLng changes
    document.title = latLng.toString();
  }, [latLng]);

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
      {/* Details Display - Top Half */}
      <Box
        sx={{
          flex: 1,
          width: "100%",
        }}
      >
        <DetailsView />
      </Box>

      {/* Map - Bottom Half */}
      <Box
        sx={{
          flex: 1,
          width: "100%",
        }}
      >
        <MapView />
      </Box>
    </Box>
  );
}

export default function HomePage() {
  return (
    <DataProvider>
      <HomePageContent />
    </DataProvider>
  );
}
