import { React, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Logo from "../components/Logo";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Badge, Divider } from "@mui/material";
import useAuth from "../hooks/useAuth";

const MainHeader = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const navigate = useNavigate();

  const auth = useAuth();
  const { user, cart, logout } = auth;

  const handleOpenNavMenu = (event, value) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogOut = () => {
    setAnchorElNav(null);

    logout(() => navigate("/", { replace: true }));
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo />
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              ml: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Sneaker
          </Typography>

          <Box sx={{ flexGrow: 1, display: "flex" }} />

          <Typography
            variant="h5"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Sneaker
          </Typography>
          {user ? (
            <>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
              >
                <Typography m={1}>Welcome {user.name}</Typography>
                <Divider variant="middle" />
                <MenuItem
                  sx={{ justifyContent: "center" }}
                  onClick={handleLogOut}
                >
                  Log out
                </MenuItem>
              </Menu>
            </>
          ) : (
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              component={RouterLink}
              to="/login"
            >
              <AccountCircle />
            </IconButton>
          )}

          <Box sx={{ flexGrow: 0, color: "white" }}>
            <Badge
              component={RouterLink}
              to="/payment"
              badgeContent={cart.length}
              color="secondary"
            >
              <ShoppingCartRoundedIcon sx={{ color: "white" }} />
            </Badge>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default MainHeader;
