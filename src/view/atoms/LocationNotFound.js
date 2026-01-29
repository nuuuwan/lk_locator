import React from "react";
import { Alert } from "@mui/material";

export default function LocationNotFound({
  message = "Location not found in any province",
}) {
  return (
    <Alert severity="warning" sx={{ mt: 1 }}>
      {message}
    </Alert>
  );
}
