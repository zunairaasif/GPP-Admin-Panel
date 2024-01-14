import React from "react";
import style from "./style";
import { Grid, Typography } from "@mui/material";

const NoData = ({ text }) => {
  return (
    <Grid container sx={style.container}>
      <Typography variant="h2">{`No ${text} found!`}</Typography>
    </Grid>
  );
};

export default NoData;
