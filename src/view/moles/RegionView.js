import { Paper, CircularProgress, Typography } from "@mui/material";

export default function RegionView({ region, regionType = "Province" }) {
  if (!region) {
    return <CircularProgress />;
  }

  return (
    <Paper sx={{ m: 1, p: 1 }} elevation={3}>
      <Typography variant="caption" color="text.secondary">
        {regionType}
      </Typography>
      <Typography variant="body1" fontWeight="medium">
        {region.name}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {region.nameSi} • {region.nameTa}
      </Typography>
    </Paper>
  );
}
