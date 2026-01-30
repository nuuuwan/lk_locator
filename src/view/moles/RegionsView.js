import { Box, Typography, Alert } from "@mui/material";
import RegionView from "./RegionView";
import { useData } from "../../nonview/core/DataContext";
export default function RegionsView() {
  const { province, district, dsd, gnd, ed, pd, lg } = useData();
  if (!province) {
    return (
      <Alert severity="info">
        <Typography variant="body1">
          No region data available for the current location.
        </Typography>
      </Alert>
    );
  }
  return (
    <Box>
      <RegionView region={province} />
      <RegionView region={district} />
      <RegionView region={dsd} />
      <RegionView region={gnd} />
      <RegionView region={ed} />
      <RegionView region={pd} />
      <RegionView region={lg} />
    </Box>
  );
}
