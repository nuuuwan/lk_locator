import { Box, Paper, Alert } from "@mui/material";

import { useData } from "../../nonview/core/DataContext";
import RegionView from "./RegionView";

export default function DetailsView() {
  const { province, district, dsd, gnd } = useData();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        p: 1,
      }}
    >
      <Alert severity="info" sx={{ mt: 1, p: 1, textAlign: "center" }}>
        Polling Divisions and Local Authorities data will be added soon.
      </Alert>
      <RegionView region={province} />
      <RegionView region={district} />
      <RegionView region={dsd} />
      <RegionView region={gnd} />
    </Box>
  );
}
