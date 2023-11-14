import React from "react";
import { Slide, Alert, Snackbar } from "@mui/material";

import Text from "../Text";
import style from "./style";

const AlertMessage = ({ open, onClose, severity, text }) => (
  <Snackbar
    open={open}
    onClose={onClose}
    sx={style.alignment}
    autoHideDuration={3000}
    TransitionComponent={Slide}
    TransitionProps={{ direction: "left" }}
    anchorOrigin={{ vertical: "top", horizontal: "right" }}
  >
    <Alert sx={style.alert} severity={severity}>
      <Text variant="body2" text={text} />
    </Alert>
  </Snackbar>
);

export default AlertMessage;
