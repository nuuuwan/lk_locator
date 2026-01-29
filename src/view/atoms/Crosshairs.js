import React from "react";
import { Box } from "@mui/material";

export default function Crosshairs() {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 1000,
      }}
    >
      <Box
        sx={{
          width: "60px",
          height: "60px",
          position: "relative",
        }}
      >
        {/* Horizontal line */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            height: "3px",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            transform: "translateY(-50%)",
          }}
        />
        {/* Vertical line */}
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            top: 0,
            bottom: 0,
            width: "3px",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            transform: "translateX(-50%)",
          }}
        />
      </Box>
    </Box>
  );
}
