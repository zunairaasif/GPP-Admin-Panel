import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";

import Text from "../Text";
import style from "./style";

export default function Loader({ open }) {
  return (
    <Backdrop sx={style.container} open={open}>
      <CircularProgress color="inherit" />
      <Text variant="h3" text="Loading..." sx={style.txt} />
    </Backdrop>
  );
}
