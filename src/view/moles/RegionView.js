import { Paper, CircularProgress, Typography } from "@mui/material";

export default function RegionView({ region, regionClass }) {
  if (!region) {
  }

  return (
    <Paper sx={{ m: 0.5, p: 0.5, width: 180 }} elevation={1}>
      {region ? (
        <Typography variant="h6">{region.name}</Typography>
      ) : (
        <CircularProgress size={20} />
      )}
      <Typography variant="body2" color="text.secondary">
        {regionClass.regionName}
      </Typography>
    </Paper>
  );
}
