import {
  Paper,
  CircularProgress,
  Typography,
  Stack,
  Divider,
} from "@mui/material";

export default function RegionView({ region }) {
  if (!region) {
    return <CircularProgress />;
  }

  return (
    <Paper sx={{ m: 0.5, p: 0.5 }} elevation={1}>
      <Typography variant="body1">{region.name}</Typography>
      <Stack direction="row" spacing={0}>
        <Typography variant="caption" color="text.secondary">
          {region.regionName} · {region.id}
        </Typography>
      </Stack>
    </Paper>
  );
}
