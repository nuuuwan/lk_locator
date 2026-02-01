import React, { useEffect, useState } from "react";
import { Box, Snackbar, Alert } from "@mui/material";
import MapView from "../moles/MapView";
import DetailsView from "../moles/DetailsView";
import CustomAppBar from "../atoms/CustomAppBar";
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
    <Box
      sx={{
        position: "relative",
        maxWidth: "800px",
        margin: "0 auto",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <CustomAppBar latLng={latLng} />

      <Snackbar
        open={showInstructions}
        autoHideDuration={8_000}
        onClose={handleCloseInstructions}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseInstructions}
          severity="info"
          sx={{ mb: 10 }}
        >
          Just drag anywhere on the map to instantly see the corresponding:
          Province, District, Divisional Secretariat Division, Grama Niladhari
          Division, Electoral District, Polling Division, or Local Authority.
        </Alert>
      </Snackbar>

      <Box
        sx={{
          position: "absolute",
          top: 48,
          height: "50%",
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
      >
        <DetailsView />
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: "50%",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
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
