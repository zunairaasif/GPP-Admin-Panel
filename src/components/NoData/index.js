import React from "react";
import { Grid } from "@mui/material";

import Text from "../Text";
import style from "./style";

const NoData = ({ text }) => {
  return (
    <Grid container sx={style.container}>
      <Text variant="h2" text={`No ${text} found!`} />
    </Grid>
  );
};

export default NoData;
