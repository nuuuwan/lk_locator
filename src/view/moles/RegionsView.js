import { Box, Alert, Stack } from "@mui/material";
import RegionView from "./RegionView";
import { useData } from "../../nonview/core/DataContext";
import Province from "../../nonview/core/Province";
import District from "../../nonview/core/District";
import DSD from "../../nonview/core/DSD";
import GND from "../../nonview/core/GND";
import ED from "../../nonview/core/ED";
import PD from "../../nonview/core/PD";
import LG from "../../nonview/core/LG";

export default function RegionsView() {
  const { province, district, dsd, gnd, ed, pd, lg } = useData();
  if (!province) {
    return <Alert severity="warning">Regions Unknown.</Alert>;
  }
  return (
    <Box>
      <Stack direction="row">
        <RegionView region={province} regionClass={Province} />
        <RegionView region={district} regionClass={District} />
      </Stack>
      <Stack direction="row">
        <RegionView region={dsd} regionClass={DSD} />
        <RegionView region={gnd} regionClass={GND} />
      </Stack>
      <Stack direction="row">
        <RegionView region={ed} regionClass={ED} />
        <RegionView region={pd} regionClass={PD} />
      </Stack>
      <Stack direction="row">
        <RegionView region={lg} regionClass={LG} />
      </Stack>
    </Box>
  );
}
