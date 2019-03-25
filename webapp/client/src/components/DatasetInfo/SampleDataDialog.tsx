import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  DialogContentText,
  Typography
} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const SampleDataDialog = ({isOpen = false, onCancel, accessUrl = ''}) => {
  return(
    <Dialog
      open={isOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Dowload Sample Data"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Typography>Download encrypted sample data zip file from {accessUrl}</Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SampleDataDialog;
