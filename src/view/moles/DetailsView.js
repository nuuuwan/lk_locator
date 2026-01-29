import React from "react";
import { Box, IconButton, Typography, Paper } from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";

export default function DetailsView() {
  const handleLocateClick = () => {
    // TODO: Implement locate functionality
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <Paper
        elevation={2}
        sx={{
          flex: 1,
          padding: 2,
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Details
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Select a location on the map to view details
        </Typography>
      </Paper>

      <Box
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
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
