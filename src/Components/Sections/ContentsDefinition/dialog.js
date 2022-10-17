import * as React from 'react';
import {Button, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle }from '@mui/material';

export default function AlertDialog({open, dialogText, handleDisagree, handleAgree}) {
  return (
      <Dialog
        open={open}
        onClose={handleDisagree}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Element data recognizing"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {handleDisagree && (
          <Button onClick={handleDisagree}>Disagree</Button>
          )}
          <Button onClick={handleAgree} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
  );
}