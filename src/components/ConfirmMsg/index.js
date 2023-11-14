import {
  Dialog,
  Button,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@mui/material";
import React from "react";

import Text from "../Text";

const Confirm = ({ open, handleClose, handleDelete }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete</DialogTitle>

      <DialogContent>
        <Text variant="body1" text="Are you sure you want to delete?" />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleDelete}>Delete</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Confirm;
