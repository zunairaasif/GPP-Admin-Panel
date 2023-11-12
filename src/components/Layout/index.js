import React from "react";
import { Grid, useTheme, useMediaQuery } from "@mui/material";

import style from "./style";
import SideMenu from "../SideMenu";
import Header from "../header";

const Layout = ({ children }) => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Grid container sx={style.dashboard}>
      {isMatch ? <SideMenu /> : null}
      <Grid item md={10} sm={9} xs={12}>
        <Header />
        <Grid item md={12} sm={12} xs={12} sx={style.content}>
          {children}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Layout;
