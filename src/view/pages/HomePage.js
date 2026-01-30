import React, { useEffect, useState } from "react";
import { Box, Snackbar, Alert } from "@mui/material";
import MapView from "../moles/MapView";
import DetailsView from "../moles/DetailsView";
import CustomAppBar from "../atoms/CustomAppBar";
import CustomBottomNavigator from "../atoms/CustomBottomNavigator";
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
          top: 48,
          left: 0,
          height: "content-height",
          width: "calc(min(90%, 400px))",
          zIndex: 2000,
        }}
      >
        <DetailsView />
      </Box>
      <CustomBottomNavigator />
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
