import { Box, Paper } from "@mui/material";

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
      }}
    >
      <Paper
        elevation={2}
        sx={{
          flex: 1,
          padding: 2,
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
        }}
      >
        <RegionView region={province} />
        <RegionView region={district} />
        <RegionView region={dsd} />
        <RegionView region={gnd} />
      </Paper>
    </Box>
  );
}
