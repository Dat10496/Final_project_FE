import { Box, Container, Tab, Tabs, Typography } from "@mui/material";
import { React, useState, memo } from "react";
import { capitalCase } from "change-case";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "@mui/material";
import { ToastContainer } from "react-toastify";



import { CURRENT_TAB } from "../app/config";

function PaymentPage() {
  const [currentTab, setCurrentTab] = useState("Cart");

  return (
    <Container
      sx={{
        mt: 2,
      }}
    >
      <Breadcrumbs m={1.5} separator="›" aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          SNEAKER STORE
        </Link>
        <Typography color="text.primary"> {currentTab} </Typography>
      </Breadcrumbs>
      <Tabs
        value={currentTab}
        scrollButtons="auto"
        variant="scrollable"
        allowScrollButtonsMobile
        onChange={(e, value) => setCurrentTab(value)}
      >
        {CURRENT_TAB.map((tab) => (
          <Tab
            disableRipple
            key={tab.value}
            label={capitalCase(tab.value)}
            icon={tab.icon}
            value={tab.value}
          />
        ))}
      </Tabs>

      {CURRENT_TAB.map((tab) => {
        const isMatched = tab.value === currentTab;
        return isMatched && <Box key={tab.value}>{tab.component}</Box>;
      })}
      <ToastContainer />
    </Container>
  );
}

export default memo(PaymentPage);
