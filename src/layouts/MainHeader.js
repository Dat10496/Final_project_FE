import { React, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Badge, Divider, Tooltip } from "@mui/material";

import Logo from "../components/Logo";
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
      <Container>
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
              <Tooltip title={user ? "User" : "Login"}>
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
              </Tooltip>
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
                <Box>
                  {user?.photo && (
                    <>
                      <Box
                        sx={{ display: "flex", justifyContent: "center" }}
                        component="div"
                      >
                        <img
                          height="25px"
                          width="25px"
                          src={user?.photo}
                          alt="userPhoto"
                        />
                      </Box>
                    </>
                  )}
                </Box>
                <Typography m={1}>Hi, {user.name} !</Typography>
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
            <Tooltip title={user ? "User" : "Login"}>
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
            </Tooltip>
          )}

          <Tooltip placement="bottom-start" title="Your Cart">
            <IconButton sx={{ flexGrow: 0, color: "white" }}>
              <Badge
                component={RouterLink}
                to="/payment"
                badgeContent={cart.length}
                color="secondary"
              >
                <ShoppingCartRoundedIcon sx={{ color: "white" }} />
              </Badge>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default MainHeader;
