import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MenuIcon from "@mui/icons-material/Menu";
import GitHubIcon from "@mui/icons-material/GitHub";
import RefreshIcon from "@mui/icons-material/Refresh";
import VERSION from "../../nonview/cons/VERSION";

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

  const handleRefreshClick = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <AppBar
      sx={{
        backgroundColor: "primary.main",
        color: "white",
        boxShadow: 2,

        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 48,
        zIndex: 3000,
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
          sx={{ zIndex: 4000 }}
        >
          <MenuItem onClick={handleGitHubClick}>
            <ListItemIcon>
              <GitHubIcon />
            </ListItemIcon>
            <ListItemText>GitHub Repository</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleRefreshClick}>
            <ListItemIcon>
              <RefreshIcon />
            </ListItemIcon>
            <ListItemText>Refresh App</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem disabled>
            <ListItemText
              secondary={`Version: ${VERSION.DATETIME_STR}`}
              sx={{ textAlign: "center" }}
            />
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
