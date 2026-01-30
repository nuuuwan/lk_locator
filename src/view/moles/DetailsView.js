import { Box } from "@mui/material";

import RegionsView from "./RegionsView";
import NominatimView from "../atoms/NominatimView";

export default function DetailsView() {
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
      <NominatimView />
    </Box>
  );
}
