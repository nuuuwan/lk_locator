import { Paper, CircularProgress, Typography } from "@mui/material";

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

  return (
    <Paper sx={{ m: 0.5, p: 0.5, width: 180 }} elevation={1}>
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
  );
}
