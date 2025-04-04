import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import { DialogBoxProps } from "../types/interfaces"

const DialogBox: React.FC<DialogBoxProps> = ({ open, title, message, buttonText, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
      <Button onClick={onClose} variant="contained" color="primary">
          {buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogBox;
