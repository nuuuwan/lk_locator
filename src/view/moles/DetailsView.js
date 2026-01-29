import React, { useState, useEffect } from "react";
import { Box, IconButton, Paper, Chip, Typography } from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import PlaceIcon from "@mui/icons-material/Place";
import LatLng from "../../nonview/base/LatLng";
import Province from "../../nonview/core/Province";

export default function DetailsView({ latLng = LatLng.DEFAULT, onLocate }) {
  const [province, setProvince] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Find province for the current latLng
    const findProvince = async () => {
      setLoading(true);
      const foundProvince = await Province.find(latLng);
      setProvince(foundProvince);
      setLoading(false);
    };

    findProvince();
  }, [latLng]);
  const handleLocateClick = async () => {
    if (onLocate) {
      const browserLatLng = await LatLng.fromBrowserLocation();
      onLocate(browserLatLng);
    }
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

        {loading && (
          <Typography variant="body2" color="text.secondary">
            Loading location details...
          </Typography>
        )}

        {!loading && province && (
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

        {!loading && !province && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Location not found in any province
          </Typography>
        )}
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
