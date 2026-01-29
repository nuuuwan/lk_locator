import { Box, Paper } from "@mui/material";

import { useData } from "../../nonview/core/DataContext";
import RegionView from "./RegionView";

export default function DetailsView() {
  const { province, district } = useData();

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
        <RegionView region={province} regionType="Province" />
        <RegionView region={district} regionType="District" />
      </Paper>
    </Box>
  );
}
