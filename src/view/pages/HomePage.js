import React from "react";
import { Box } from "@mui/material";
import MapView from "../moles/MapView";
import DetailsView from "../moles/DetailsView";

export default function HomePage() {
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
        <MapView />
      </Box>

      {/* Details Display - Bottom Half */}
      <Box
        sx={{
          flex: 1,
          width: "100%",
        }}
      >
        <DetailsView />
      </Box>
    </Box>
  );
}
