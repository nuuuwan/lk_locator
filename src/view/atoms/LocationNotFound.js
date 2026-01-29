import React from "react";
import { Typography } from "@mui/material";

export default function LocationNotFound({
  message = "Location not found in any province",
}) {
  return (
    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
      {message}
    </Typography>
  );
}
