import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import FlightIcon from "@mui/icons-material/Flight";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useLocation } from "react-router-dom";
import CategoryIcon from "@mui/icons-material/Category";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";

import style from "./style";
import Text from "../Text";

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
      <Text variant="h5" text="Ghoomo Phiro Pakistan" sx={style.heading} />
      <Text variant="subtitle2" text="MENU" />

      <Grid sx={style.menuItems}>
        <Link style={style.link} to="/trips">
          <Grid
            sx={
              activeLink === "/trips" || activeLink === "/new-trip"
                ? style.menuItemSelected
                : style.menuItem
            }
          >
            <FlightIcon fontSize="small" sx={style.icon} />
            <Text variant="body2" text="Trips" />
          </Grid>
        </Link>

        <Link style={style.link} to="/services">
          <Grid
            sx={
              activeLink === "/services" || activeLink === "/new-service"
                ? style.menuItemSelected
                : style.menuItem
            }
          >
            <MiscellaneousServicesIcon fontSize="small" sx={style.icon} />
            <Text variant="body2" text="Services" />
          </Grid>
        </Link>

        <Link style={style.link} to="/categories">
          <Grid
            sx={
              activeLink === "/categories" || activeLink === "/new-category"
                ? style.menuItemSelected
                : style.menuItem
            }
          >
            <CategoryIcon fontSize="small" sx={style.icon} />
            <Text variant="body2" text="Categories" />
          </Grid>
        </Link>

        <Link style={style.link} to="/lotteries">
          <Grid
            sx={
              activeLink === "/lotteries" || activeLink === "/new-lottery"
                ? style.menuItemSelected
                : style.menuItem
            }
          >
            <ConfirmationNumberIcon fontSize="small" sx={style.icon} />
            <Text variant="body2" text="Lotteries" />
          </Grid>
        </Link>

        <Text variant="subtitle2" text="Settings" sx={style.setting} />

        <Grid sx={style.menuItem} onClick={handleLogout}>
          <LogoutIcon fontSize="small" sx={style.icon} />
          <Text variant="body2" text="Logout" />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SideMenu;
