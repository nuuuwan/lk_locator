import { useState } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Tooltip,
} from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import CasinoIcon from "@mui/icons-material/Casino";
import MapIcon from "@mui/icons-material/Map";

import { useData } from "../../nonview/core/DataContext";
import LatLng from "../../nonview/base/LatLng";
import GND from "../../nonview/core/GND";

export default function CustomBottomNavigator() {
  const { latLng, onLatLngChange } = useData();
  const [value, setValue] = useState(null);

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

  const handleGoogleMapsClick = () => {
    if (latLng) {
      const url = `https://www.google.com/maps?q=${latLng.lat},${latLng.lng}`;
      window.open(url, "_blank");
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      handleRandomClick();
    } else if (newValue === 1) {
      handleGoogleMapsClick();
    } else if (newValue === 2) {
      handleLocateClick();
    }
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 3000,
        boxShadow: 3,
        height: 60,
        "& .MuiBottomNavigationAction-root": {
          minWidth: 80,
          padding: 2,
        },
      }}
    >
      <Tooltip title="Go to random location" placement="top">
        <BottomNavigationAction icon={<CasinoIcon sx={{ fontSize: 20 }} />} />
      </Tooltip>
      <Tooltip title="Open in Google Maps" placement="top">
        <BottomNavigationAction icon={<MapIcon sx={{ fontSize: 20 }} />} />
      </Tooltip>
      <Tooltip title="Go to my location" placement="top">
        <BottomNavigationAction
          icon={<MyLocationIcon sx={{ fontSize: 20 }} />}
        />
      </Tooltip>
    </BottomNavigation>
  );
}
