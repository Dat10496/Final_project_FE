import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function LoadingScreen() {
  return (
    <Box
      sx={{
        position: "absolute",
        left: "50%",
        top: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default LoadingScreen;
