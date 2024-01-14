import React from "react";
import style from "./style";
import { Slide, Alert, Snackbar, Typography } from "@mui/material";

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
      <Typography variant="body2">{text}</Typography>
    </Alert>
  </Snackbar>
);

export default AlertMessage;
