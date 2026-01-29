import React from "react";
import { Box, Paper, Chip, Typography } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import LatLng from "../../nonview/base/LatLng";
import RegionView from "./RegionView";
import LocationNotFound from "../atoms/LocationNotFound";

export default function DetailsView({
  latLng = LatLng.DEFAULT,
  province = null,
}) {
  const loadingProvince = province === null;

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
          <RegionView region={province} regionType="Province" />
        )}

        {!loadingProvince && !province && <LocationNotFound />}
      </Paper>
    </Box>
  );
}
