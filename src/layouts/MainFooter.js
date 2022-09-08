import { Link, Typography } from "@mui/material";
import React from "react";

function MainFooter() {
  return (
    <Typography variant="body2" align="center" p={1}>
      {"Copyright c"} <Link>Sneaker</Link>
      {"."}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default MainFooter;
