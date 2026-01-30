import React, { useEffect, useState } from "react";
import { Box, Snackbar, Alert } from "@mui/material";
import MapView from "../moles/MapView";
import DetailsView from "../moles/DetailsView";
import { DataProvider, useData } from "../../nonview/core/DataContext";

function HomePageContent() {
  const { latLng } = useData();
  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    // Update document title when latLng changes
    document.title = latLng.toString();
  }, [latLng]);

  const handleCloseInstructions = () => {
    setShowInstructions(false);
  };

  return (
    <Box sx={{}}>
      <Snackbar
        open={showInstructions}
        autoHideDuration={8_000}
        onClose={handleCloseInstructions}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseInstructions} severity="info" sx={{ mt: 2 }}>
          Drag to anywhere on the map to see which provinces, districts,
          divisional secretariats, grama niladhari divisions, electoral
          districts, polling divisions and local authorities in Sri Lanka the
          location belongs to.
        </Alert>
      </Snackbar>

      <Box
        sx={{
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
      >
        <MapView />
      </Box>

      <Box
        sx={{
          position: "fixed",
          top: 0,
          right: 0,
          width: 240,
          zIndex: 2000,
        }}
      >
        <DetailsView />
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
