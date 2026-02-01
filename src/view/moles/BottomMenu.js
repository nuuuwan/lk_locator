import { Box, IconButton, Tooltip } from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import CasinoIcon from "@mui/icons-material/Casino";

import { useData } from "../../nonview/core/DataContext";
import LatLng from "../../nonview/base/LatLng";
import GND from "../../nonview/core/GND";

export default function BottomMenu() {
  const { onLatLngChange } = useData();

  const handleLocateClick = async () => {
    if (onLatLngChange) {
      const browserLatLng = await LatLng.fromBrowserLocation();

      // Check if browser location is within Sri Lanka bounds
      if (!browserLatLng.isWithinSriLankaBounds()) {
        // Use default Sri Lanka center if outside bounds
        onLatLngChange(LatLng.DEFAULT);
      } else {
        onLatLngChange(browserLatLng);
      }
    }
  };

  const handleRandomClick = async () => {
    if (onLatLngChange) {
      const allGNDs = await GND.listAll();
      if (allGNDs.length > 0) {
        const randomIndex = Math.floor(Math.random() * allGNDs.length);
        const randomGND = allGNDs[randomIndex];
        if (randomGND.centerLatLng) {
          onLatLngChange(randomGND.centerLatLng);
        }
      }
    }
  };

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        width: 120,
        height: 48,
        right: 0,
        zIndex: 2000,
        display: "flex",
        justifyContent: "space-evenly",
        gap: 2,
        padding: 2,
      }}
    >
      <Tooltip title="Go to random location" placement="top">
        <IconButton onClick={handleRandomClick} color="primary">
          <CasinoIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Go to my location" placement="top">
        <IconButton onClick={handleLocateClick} color="primary">
          <MyLocationIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
