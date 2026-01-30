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
  const {
    province,
    provinceGeo,
    district,
    districtGeo,
    dsd,
    dsdGeo,
    gnd,
    gndGeo,
    ed,
    pd,
    pdGeo,
    lg,
  } = useData();
  if (!province) {
    return <Alert severity="warning">Regions Unknown.</Alert>;
  }
  return (
    <Box>
      <Stack direction="row">
        <RegionView
          region={province}
          regionClass={Province}
          regionGeo={provinceGeo}
        />
        <RegionView
          region={district}
          regionClass={District}
          regionGeo={districtGeo}
        />
      </Stack>
      <Stack direction="row">
        <RegionView region={dsd} regionClass={DSD} regionGeo={dsdGeo} />
        <RegionView region={gnd} regionClass={GND} regionGeo={gndGeo} />
      </Stack>
      <Stack direction="row">
        <RegionView region={ed} regionClass={ED} />
        <RegionView region={pd} regionClass={PD} regionGeo={pdGeo} />
      </Stack>
      <Stack direction="row">
        <RegionView region={lg} regionClass={LG} />
      </Stack>
    </Box>
  );
}
