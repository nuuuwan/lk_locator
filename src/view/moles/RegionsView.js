import { Box, Alert, Typography, Stack } from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import LocationCityIcon from "@mui/icons-material/LocationCity";
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
    edGeo,
    pd,
    pdGeo,
    lg,
    lgGeo,
  } = useData();

  if (!province) {
    return <Alert severity="warning">Regions Unknown.</Alert>;
  }

  return (
    <Box sx={{ width: "100%", p: 0.5 }}>
      {/* Administrative Regions */}
      <Box sx={{ mb: 0.5 }}>
        <Stack
          direction="row"
          spacing={0.5}
          alignItems="center"
          sx={{ px: 0.5 }}
        >
          <AccountBalanceIcon
            sx={{ fontSize: "0.9rem", color: "text.secondary" }}
          />
          <Typography
            variant="caption"
            fontWeight="bold"
            sx={{ color: "text.secondary", fontSize: "0.7rem" }}
          >
            Administrative Regions
          </Typography>
        </Stack>
        <Stack spacing={0.25} sx={{ mt: 0.25 }}>
          <Stack direction="row" spacing={0.25}>
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
          <Stack direction="row" spacing={0.25}>
            <RegionView region={dsd} regionClass={DSD} regionGeo={dsdGeo} />
            <RegionView region={gnd} regionClass={GND} regionGeo={gndGeo} />
          </Stack>
        </Stack>
      </Box>

      <Box sx={{ mb: 0.5 }}>
        <Stack
          direction="row"
          spacing={0.5}
          alignItems="center"
          sx={{ px: 0.5 }}
        >
          <HowToVoteIcon sx={{ fontSize: "0.9rem", color: "text.secondary" }} />
          <Typography
            variant="caption"
            fontWeight="bold"
            sx={{ color: "text.secondary", fontSize: "0.7rem" }}
          >
            Electoral Regions
          </Typography>
        </Stack>
        <Stack spacing={0.25} sx={{ mt: 0.25 }}>
          <Stack direction="row" spacing={0.25}>
            <RegionView region={ed} regionClass={ED} regionGeo={edGeo} />
            <RegionView region={pd} regionClass={PD} regionGeo={pdGeo} />
          </Stack>
        </Stack>
      </Box>

      {/* Local Government Regions */}
      <Box sx={{ mb: 0.5 }}>
        <Stack
          direction="row"
          spacing={0.5}
          alignItems="center"
          sx={{ px: 0.5 }}
        >
          <LocationCityIcon
            sx={{ fontSize: "0.9rem", color: "text.secondary" }}
          />
          <Typography
            variant="caption"
            fontWeight="bold"
            sx={{ color: "text.secondary", fontSize: "0.7rem" }}
          >
            Local Government Regions
          </Typography>
        </Stack>
        <Stack spacing={0.25} sx={{ mt: 0.25 }}>
          <Stack direction="row" spacing={0.25}>
            <RegionView region={lg} regionClass={LG} regionGeo={lgGeo} />
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
