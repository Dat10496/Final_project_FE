import React from "react";
import { Outlet } from "react-router-dom";
import { Stack } from "@mui/material";
import Logo from "../components/Logo";
import "./BlankLayout.css";

function BlankLayout() {
  return (
    <div className="blank-layout">
      <Stack
        sx={{
          minHeight: "100vh",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
        }}
      >
        <Logo sx={{ width: 100, height: 100, mb: 4 }} />
        <Outlet />
      </Stack>
    </div>
  );
}

export default BlankLayout;
