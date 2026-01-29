import React from "react";
import { Box, IconButton, Paper, Chip } from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import PlaceIcon from "@mui/icons-material/Place";
import LatLng from "../../nonview/base/LatLng";

export default function DetailsView({ latLng = LatLng.DEFAULT }) {
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
        <Box sx={{ mb: 2 }}>
          <Chip
            icon={<PlaceIcon />}
            label={latLng.toString()}
            color="primary"
            variant="outlined"
            sx={{ fontSize: "1rem", padding: 1 }}
          />
        </Box>
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
