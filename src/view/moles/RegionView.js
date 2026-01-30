import { Paper, CircularProgress, Typography } from "@mui/material";

export default function RegionView({ region }) {
  if (!region) {
    return <CircularProgress />;
  }

  return (
    <Paper sx={{ m: 0.5, p: 0.5 }} elevation={1}>
      <Typography variant="h6">{region.name}</Typography>
      <Typography variant="caption" color="text.secondary">
        {region.regionName}
      </Typography>
    </Paper>
  );
}
