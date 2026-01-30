import { Box, Paper, Typography } from "@mui/material";

import { useData } from "../../nonview/core/DataContext";
import RegionView from "./RegionView";

export default function DetailsView() {
  const { latLng, province, district, dsd, gnd, ed, pd, lg } = useData();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        p: 1,
        opacity: 0.8,
      }}
    >
      <Paper sx={{ m: 0.5, p: 0.5 }} elevation={1}>
        <Typography variant="body1">{latLng.toString()}</Typography>
      </Paper>
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
