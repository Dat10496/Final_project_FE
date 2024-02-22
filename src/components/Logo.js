import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box } from "@mui/material";
import logoImg from "../images/logo2.jpg";



function Logo({ disabledLink = false, width, height, sx }) {
  const logo = (
    <Box
      sx={{
        width: width || 40,
        height: height || 40,
        borderRadius: 1,
        overflow: "hidden",
        boxShadow: 10,
        ...sx,
      }}
    >
      <img src={logoImg} alt="logo" width="100%" />
    </Box>
  );
  if (disabledLink) {
    return <>{logo}</>;
  }
  return <RouterLink to="/">{logo}</RouterLink>;
}

export default Logo;
