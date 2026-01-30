import { useState } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import CasinoIcon from "@mui/icons-material/Casino";
import { useData } from "../../nonview/core/DataContext";
import LatLng from "../../nonview/base/LatLng";
import GND from "../../nonview/core/GND";

export default function CustomBottomNavigator() {
  const { onLatLngChange } = useData();
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      handleLocateClick();
    } else if (newValue === 1) {
      handleRandomClick();
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
      <BottomNavigationAction icon={<MyLocationIcon sx={{ fontSize: 20 }} />} />
      <BottomNavigationAction icon={<CasinoIcon sx={{ fontSize: 20 }} />} />
    </BottomNavigation>
  );
}
