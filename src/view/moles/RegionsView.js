import { Box, Alert } from "@mui/material";
import RegionView from "./RegionView";
import { useData } from "../../nonview/core/DataContext";
export default function RegionsView() {
  const { province, district, dsd, gnd, ed, pd, lg } = useData();
  if (!province) {
    return <Alert severity="warning">Regions Unknown.</Alert>;
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
