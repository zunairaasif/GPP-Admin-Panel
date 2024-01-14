import React from "react";
import style from "./style";
import { Backdrop, CircularProgress, Typography } from "@mui/material";

export default function Loader({ open }) {
  return (
    <Backdrop sx={style.container} open={open}>
      <CircularProgress color="inherit" />
      <Typography variant="h3" sx={style.txt}>
        Loading...
      </Typography>
    </Backdrop>
  );
}
