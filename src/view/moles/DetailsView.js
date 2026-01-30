import { Box, Paper, Typography } from "@mui/material";

import { useData } from "../../nonview/core/DataContext";
import RegionsView from "./RegionsView";

export default function DetailsView() {
  const { latLng } = useData();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        p: 1,
        opacity: 0.95,
      }}
    >
      <RegionsView />
    </Box>
  );
}
