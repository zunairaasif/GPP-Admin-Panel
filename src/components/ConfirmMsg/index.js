import {
  Dialog,
  Button,
  DialogTitle,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import React from "react";

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
        <Typography variant="body1">
          Are you sure you want to delete?
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleDelete}>Delete</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Confirm;
