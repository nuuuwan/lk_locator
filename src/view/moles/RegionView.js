import {
  Paper,
  CircularProgress,
  Typography,
  ButtonBase,
  Tooltip,
} from "@mui/material";

export default function RegionView({ region, regionClass }) {
  if (!region) {
  }

  const getFontSize = (text) => {
    if (!text) return "1.25rem";
    const length = text.length;
    if (length <= 10) return "1.25rem";
    if (length <= 15) return "1.1rem";
    if (length <= 20) return "0.95rem";
    if (length <= 25) return "0.85rem";
    return "0.75rem";
  };

  const handleClick = () => {
    if (region) {
      const query = `${region.name} ${regionClass.regionName}`;
      const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
      window.open(url, "_blank");
    }
  };

  return (
    <Tooltip title="Open Google Search" arrow>
      <ButtonBase
        onClick={handleClick}
        sx={{
          width: 180,
          m: 0.5,
          display: "block",
          textAlign: "left",
          borderRadius: 1,
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "scale(1.02)",
            "& .MuiPaper-root": {
              elevation: 4,
              boxShadow: 4,
              bgcolor: "action.hover",
            },
          },
        }}
        disabled={!region}
      >
        <Paper
          sx={{ p: 0.5, width: "100%", transition: "all 0.2s" }}
          elevation={1}
        >
          {region ? (
            <Typography variant="h6" sx={{ fontSize: getFontSize(region.name) }}>
              {region.name}
            </Typography>
          ) : (
            <CircularProgress size={20} />
          )}
          <Typography variant="body2" color="text.secondary">
            {regionClass.regionName}
          </Typography>
        </Paper>
      </ButtonBase>
    </Tooltip>
  );
}
