import { Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import FlightIcon from "@mui/icons-material/Flight";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleIcon from "@mui/icons-material/People";
import RedeemIcon from "@mui/icons-material/Redeem";
import { Link, useLocation } from "react-router-dom";
import CategoryIcon from "@mui/icons-material/Category";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";

import style from "./style";

const SideMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState(null);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Grid container item md={2} sm={3} sx={style.sideMenu}>
      <Typography variant="h5" sx={style.heading}>
        Ghoomo Phiro Pakistan
      </Typography>
      <Typography variant="subtitle2">MENU</Typography>

      <Grid sx={style.menuItems}>
        <Link style={style.link} to="/trips">
          <Grid
            sx={
              activeLink === "/trips" ||
              activeLink === "/new-trip" ||
              (activeLink && activeLink.startsWith("/edit-trip/")) ||
              (activeLink && activeLink.startsWith("/view-trip-details/"))
                ? style.menuItemSelected
                : style.menuItem
            }
          >
            <FlightIcon fontSize="small" sx={style.icon} />
            <Typography variant="body2">Trips</Typography>
          </Grid>
        </Link>

        <Link style={style.link} to="/services">
          <Grid
            sx={
              activeLink === "/services" ||
              activeLink === "/new-service" ||
              (activeLink && activeLink.startsWith("/edit-service/"))
                ? style.menuItemSelected
                : style.menuItem
            }
          >
            <MiscellaneousServicesIcon fontSize="small" sx={style.icon} />
            <Typography variant="body2">Services</Typography>
          </Grid>
        </Link>

        <Link style={style.link} to="/categories">
          <Grid
            sx={
              activeLink === "/categories" ||
              activeLink === "/new-category" ||
              (activeLink && activeLink.startsWith("/edit-category/"))
                ? style.menuItemSelected
                : style.menuItem
            }
          >
            <CategoryIcon fontSize="small" sx={style.icon} />
            <Typography variant="body2">Categories</Typography>
          </Grid>
        </Link>

        <Link style={style.link} to="/bookings">
          <Grid
            sx={
              activeLink === "/bookings" ||
              (activeLink && activeLink.startsWith("/edit-booking"))
                ? style.menuItemSelected
                : style.menuItem
            }
          >
            <BookOnlineIcon fontSize="small" sx={style.icon} />
            <Typography variant="body2">Bookings</Typography>
          </Grid>
        </Link>

        <Link style={style.link} to="/tickets">
          <Grid
            sx={
              activeLink === "/tickets" ||
              activeLink === "/new-ticket" ||
              (activeLink && activeLink.startsWith("/edit-ticket"))
                ? style.menuItemSelected
                : style.menuItem
            }
          >
            <ConfirmationNumberIcon fontSize="small" sx={style.icon} />
            <Typography variant="body2">Tickets</Typography>
          </Grid>
        </Link>

        <Link style={style.link} to="/lucky-draws">
          <Grid
            sx={
              activeLink === "/lucky-draws" ||
              activeLink === "/new-lucky-draw" ||
              (activeLink && activeLink.startsWith("/view-lucky-draw/"))
                ? style.menuItemSelected
                : style.menuItem
            }
          >
            <RedeemIcon fontSize="small" sx={style.icon} />
            <Typography variant="body2">Lucky Draws</Typography>
          </Grid>
        </Link>

        <Link style={style.link} to="/users">
          <Grid
            sx={
              activeLink === "/users" ||
              activeLink === "/new-user" ||
              (activeLink && activeLink.startsWith("/edit-user"))
                ? style.menuItemSelected
                : style.menuItem
            }
          >
            <PeopleIcon fontSize="small" sx={style.icon} />
            <Typography variant="body2">Users</Typography>
          </Grid>
        </Link>

        <Typography variant="subtitle2" sx={style.setting}>
          Settings
        </Typography>

        <Grid sx={style.menuItem} onClick={handleLogout}>
          <LogoutIcon fontSize="small" sx={style.icon} />
          <Typography variant="body2">Logout</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SideMenu;
