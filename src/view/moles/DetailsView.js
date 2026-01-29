import React from "react";
import { Box, Paper, Chip, Typography } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import LatLng from "../../nonview/base/LatLng";

export default function DetailsView({
  latLng = LatLng.DEFAULT,
  province = null,
  loadingProvince = false,
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
        <Box sx={{ mb: 2 }}>
          <Chip
            icon={<PlaceIcon />}
            label={latLng.toString()}
            color="primary"
            variant="outlined"
            sx={{ fontSize: "1rem", padding: 1 }}
          />
        </Box>

        {loadingProvince && (
          <Typography variant="body2" color="text.secondary">
            Loading location details...
          </Typography>
        )}

        {!loadingProvince && province && (
          <Box sx={{ mt: 1 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Province
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {province.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {province.nameSi} • {province.nameTa}
            </Typography>
          </Box>
        )}

        {!loadingProvince && !province && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Location not found in any province
          </Typography>
        )}
      </Paper>
    </Box>
  );
}
