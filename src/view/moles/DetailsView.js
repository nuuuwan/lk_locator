import React from "react";
import { Box, Paper } from "@mui/material";

import LatLng from "../../nonview/base/LatLng";
import RegionView from "./RegionView";

export default function DetailsView({
  latLng = LatLng.DEFAULT,
  province = null,
}) {
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
        <RegionView region={province} />
      </Paper>
    </Box>
  );
}
