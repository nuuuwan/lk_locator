import React from "react";
import { Box } from "@mui/material";

const color = "#000";
const circles = [
  { size: 100 },
  { size: 48 },
  { size: 12 }, // dot as filled circle
];

export default function Crosshairs() {
  return (
    <Box
      sx={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1000,
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {circles.map((circle, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            width: circle.size,
            height: circle.size,
            borderRadius: "50%",
            boxSizing: "border-box",
            border: circle.size === 12 ? undefined : `2.5px solid ${color}`,
            backgroundColor: circle.size === 12 ? color : undefined,
          }}
        />
      ))}
    </Box>
  );
}
