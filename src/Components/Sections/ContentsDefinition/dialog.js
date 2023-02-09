import * as React from "react";
import {
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export default function AlertDialog({
  open,
  dialogText,
  handleDisagree,
  handleAgree,
  dialogTitle = "Element data recognizing",
  agreeText = "Agree",
  disagreeText = "Disagree",
}) {
  return (
    <Dialog
      open={open}
      onClose={handleDisagree}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
      <DialogContent>
        {/* <DialogContentText id="alert-dialog-description"> */}
        {dialogText}
        {/* </DialogContentText> */}
      </DialogContent>
      <DialogActions>
        {handleDisagree && (
          <Button onClick={handleDisagree}>{disagreeText}</Button>
        )}
        <Button onClick={handleAgree} autoFocus>
          {agreeText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
