import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function CustomAppBar({ latLng }) {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "primary.main",
        color: "white",
        boxShadow: 2,
      }}
    >
      <Toolbar sx={{ minHeight: 48 }}>
        <LocationOnIcon sx={{ mr: 1 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {latLng ? latLng.toString() : "LK Locator"}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
