import {
  Box,
  Button,
  Input,
  Link,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import saleImage from "../images/Layer-5.jpg";
import paymentImage from "../images/payment-1.png";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import MailIcon from "@mui/icons-material/Mail";

import { CONTACT, ICON_LINK } from "../app/config";

const styles = {
  contactStyle: {
    display: "flex",
    alignContent: "center",
    color: "primary.light",
  },
  paperStyle: {
    backgroundImage: `url(${saleImage})`,
    height: 300,
  },
  coverTypo: {
    position: "relative",
    right: { xs: "", sm: "15%" },
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  coverInput: {
    position: "relative",
    right: { xs: "", sm: "15%" },
    display: "flex",
    justifyContent: "center",
  },
  boxContact: {
    height: { xs: 450, md: 180 },
    backgroundColor: "#f5f5f5",
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    justifyContent: "space-evenly",
    p: 1,
  },
  boxFooter: {
    height: { xs: 280, md: 50 },
    backgroundColor: "primary.darker",
    display: { xs: "", md: "flex" },
    justifyContent: "space-evenly",
  },
  link: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  tooltip: {
    "&:hover": {
      color: "secondary.darker",
      cursor: "pointer",
    },
  },
};

function MainFooter() {
  return (
    <Box position="static" mt={2}>
      <Box className="saleImage">
        <Box sx={{ p: 3 }} style={styles.paperStyle}>
          <Box sx={styles.coverTypo}>
            <Typography color="primary.contrastText" variant="h4">
              Do you need more sale?
            </Typography>
            <Typography color="primary.contrastText" variant="h6">
              Sign up free and get sale up to 50%
            </Typography>
          </Box>

          <Box sx={styles.coverInput} component="div">
            <Input
              sx={{ color: "primary.contrastText" }}
              placeholder="Your email..."
              variant="filled"
            />

            <Button color="success" href="#" variant="contained">
              Yes, I want!
            </Button>
          </Box>
        </Box>
      </Box>

      <Box name="contact" sx={styles.boxContact}>
        <Stack spacing={1} name="contact">
          <Typography mb={{ sm: 2, xs: 0 }} variant="h6">
            CONTACT
          </Typography>
          <Box sx={styles.contactStyle} component="div">
            <AddBusinessIcon />
            <Typography ml={1} variant="subtitle2">
              HCMC, VietNam
            </Typography>
          </Box>
          <Box sx={styles.contactStyle} component="div">
            <ContactPhoneIcon />
            <Typography ml={1} variant="subtitle2">
              +84 999 999 999
            </Typography>
          </Box>
          <Box sx={styles.contactStyle} component="div">
            <MailIcon />
            <Typography ml={1} variant="subtitle2">
              sneakerHCMC@gmail.com
            </Typography>
          </Box>
        </Stack>

        <Stack spacing={0.5} name="about">
          <Typography mb={{ sm: 2, xs: 0 }} variant="h6">
            LINKS
          </Typography>
          {CONTACT.map((value) => (
            <Link
              key={value}
              color="primary.light"
              variant="subtitle2"
              underline="none"
              href="#"
              sx={styles.tooltip}
            >
              {value}
            </Link>
          ))}
        </Stack>

        <Stack mt={1} spacing={3} direction="row" name="link">
          {ICON_LINK.map((value) => (
            <Tooltip
              sx={styles.tooltip}
              key={value.name}
              title={value.name}
              enterDelay={500}
              leaveDelay={200}
            >
              {value.icon}
            </Tooltip>
          ))}
        </Stack>
      </Box>

      <Box sx={styles.boxFooter} name="footer">
        <Box color="primary.contrastText">
          <Typography variant="body2" align="center" p={1}>
            {"Copyright"}{" "}
            <Link
              sx={styles.link}
              color="secondary"
              href="https://github.com/Dat10496"
            >
              DatVo
            </Link>
            {"."}
            {new Date().getFullYear()}
          </Typography>
        </Box>
        <Box m={1} component="div">
          <img src={paymentImage} alt="saleImage" width="100%" />
        </Box>
      </Box>
    </Box>
  );
}

export default MainFooter;
