import { Paper, CircularProgress, Typography } from "@mui/material";

export default function RegionView({ region, regionType }) {
  if (!region) {
    return <CircularProgress />;
  }

  return (
    <Paper sx={{ m: 1, p: 1 }} elevation={3}>
      <Typography variant="caption" color="text.secondary">
        {region.id}
      </Typography>
      <Typography variant="body1">{region.name}</Typography>
      <Typography variant="caption" color="text.secondary">
        {regionType}
      </Typography>
    </Paper>
  );
}
