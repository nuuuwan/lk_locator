import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MenuIcon from "@mui/icons-material/Menu";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function CustomAppBar({ latLng }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleGitHubClick = () => {
    window.open("https://github.com/nuuuwan/lk_locator", "_blank");
    handleMenuClose();
  };

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
        <IconButton color="inherit" onClick={handleMenuOpen} edge="end">
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleGitHubClick}>
            <GitHubIcon sx={{ mr: 1 }} />
            GitHub Repository
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
