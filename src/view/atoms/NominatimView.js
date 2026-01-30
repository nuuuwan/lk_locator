import { Typography, Paper } from "@mui/material";
import { useData } from "../../nonview/core/DataContext";

export default function NominatimView() {
  const { nominatimData } = useData();

  if (!nominatimData) {
    return null;
  }

  const { display_name } = nominatimData;

  return (
    <Paper sx={{ m: 0.5, p: 0.5, width: 370 }} elevation={1}>
      {display_name && (
        <Typography variant="title" sx={{ mb: 2 }}>
          {display_name}
        </Typography>
      )}
      <Typography variant="body2" color="text.secondary" sx={{ opacity: 0.5 }}>
        via OpenStreetMap Nominatim
      </Typography>
    </Paper>
  );
}
