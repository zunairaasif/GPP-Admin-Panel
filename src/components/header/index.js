import {
  Box,
  Grid,
  Menu,
  Toolbar,
  MenuItem,
  useTheme,
  InputBase,
  IconButton,
  useMediaQuery,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Brightness4Icon from "@mui/icons-material/Brightness4";

import style from "./style";
import flag from "../../images/flag.png";
import avatar from "../../images/avatar.png";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Header() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));

  const isMenuOpen = Boolean(anchorEl);
  const menuId = "primary-search-account-menu";

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handelLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Typography variant="body2">Profile</Typography>
      </MenuItem>
      <MenuItem onClick={handelLogout}>
        <Typography variant="body2">Logout</Typography>
      </MenuItem>
    </Menu>
  );

  return (
    <Grid item md={12} sm={12} xs={12} sx={style.bg}>
      <Toolbar sx={style.toolbar}>
        {isMatch ? (
          <IconButton
            size="small"
            edge="start"
            sx={{ mr: 2 }}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
        ) : null}

        <Box sx={style.searchField}>
          <Box sx={style.searchIconWrapper}>
            <SearchIcon />
          </Box>

          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Box>

        <Box sx={style.box} />

        {isMatch ? null : (
          <Grid container item md={2.5} sm={6} sx={style.grid}>
            <Box sx={style.hover}>
              <img src={flag} alt="flag" width={26} height={15} />
            </Box>

            <Box sx={style.hover}>
              <Brightness4Icon sx={{ color: "#5d596c" }} />
            </Box>

            <IconButton
              edge="end"
              size="small"
              color="inherit"
              aria-haspopup="true"
              aria-controls={menuId}
              onClick={handleProfileMenuOpen}
              aria-label="account of current user"
            >
              <img
                src={avatar}
                alt="avatar"
                width={30}
                height={30}
                style={style.img}
              />
              <Typography variant="body2">User</Typography>
            </IconButton>
          </Grid>
        )}
      </Toolbar>
      {renderMenu}
    </Grid>
  );
}
