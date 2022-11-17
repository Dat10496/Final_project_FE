import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function LoadingScreen() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 700,
        height: 500,
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default LoadingScreen;
