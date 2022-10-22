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
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";

const CONTACT = ["About Us", "Contact Us", "My Account", "Blog"];

const ICON_LINK = [
  { name: "twitter", icon: <TwitterIcon /> },
  { name: "facebook", icon: <FacebookIcon /> },
  { name: "youtube", icon: <YouTubeIcon /> },
  { name: "instagram", icon: <InstagramIcon /> },
];

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
};

function MainFooter() {
  return (
    <Box sx={{ maxWidth: { xs: 400, md: "xl" } }} mt={2}>
      <Box className="saleImage">
        <Box sx={{ p: 3 }} style={styles.paperStyle}>
          <Box
            sx={{
              position: "relative",
              right: { xs: "", sm: "15%" },
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography color="primary.contrastText" variant="h4">
              Do you need more sale?
            </Typography>
            <Typography color="primary.contrastText" variant="h6">
              Sign up free and get sale up to 50%
            </Typography>
          </Box>

          <Box
            sx={{
              position: "relative",
              right: { xs: "", sm: "15%" },
              display: "flex",
              justifyContent: "center",
            }}
            component="div"
          >
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

      <Box
        name="contact"
        sx={{
          height: { xs: 350, md: 180 },
          backgroundColor: "#f5f5f5",
          display: { xs: "", sm: "flex" },
          justifyContent: "space-evenly",
          p: 1,
        }}
      >
        <Stack spacing={1} name="contact">
          <Typography mb={2} variant="h6">
            CONTACT
          </Typography>
          <Box sx={styles.contactStyle} component="div">
            <AddBusinessIcon />
            <Typography variant="subtitle2">HCMC, VietNam</Typography>
          </Box>
          <Box sx={styles.contactStyle} component="div">
            <ContactPhoneIcon />
            <Typography variant="subtitle2">+84 999 999 999</Typography>
          </Box>
          <Box sx={styles.contactStyle} component="div">
            <MailIcon />
            <Typography variant="subtitle2">sneakerHCMC@gmail.com</Typography>
          </Box>
        </Stack>

        <Stack spacing={0.5} name="about">
          <Typography mb={2} variant="h6">
            LINKS
          </Typography>
          {CONTACT.map((value) => (
            <Link
              key={value}
              color="primary.light"
              variant="subtitle2"
              underline="none"
              href="#"
            >
              {value}
            </Link>
          ))}
        </Stack>

        <Stack mt={1} spacing={3} direction="row" name="link">
          {ICON_LINK.map((value) => (
            <Tooltip
              key={value.name}
              title={value.name}
              enterDelay={300}
              leaveDelay={200}
            >
              {value.icon}
            </Tooltip>
          ))}
        </Stack>
      </Box>

      <Box
        sx={{
          height: { xs: 280, md: 50 },
          backgroundColor: "primary.darker",
          display: { xs: "", md: "flex" },
          justifyContent: "space-evenly",
        }}
        name="footer"
      >
        <Box color="primary.contrastText">
          <Typography variant="body2" align="center" p={1}>
            {"Copyright c"} <Link to="#">Sneaker</Link>
            {"."}
            {new Date().getFullYear()}
          </Typography>
        </Box>
        <Box m={1} component="div">
          <img src={paymentImage} alt="saleImage" />
        </Box>
      </Box>
    </Box>
  );
}

export default MainFooter;
