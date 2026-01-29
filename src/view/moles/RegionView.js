import React from "react";
import { Box, Typography } from "@mui/material";

export default function RegionView({ region, regionType = "Province" }) {
  if (!region) {
    return null;
  }

  return (
    <Box sx={{ mt: 1 }}>
      <Typography variant="subtitle2" color="text.secondary">
        {regionType}
      </Typography>
      <Typography variant="body1" fontWeight="medium">
        {region.name}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {region.nameSi} • {region.nameTa}
      </Typography>
    </Box>
  );
}
