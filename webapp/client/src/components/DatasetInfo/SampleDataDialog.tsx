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

const SampleDataDialog = ({isOpen = false, onCancel, accessUrl = '', onSend}) => {
  return(
    <Dialog
      open={isOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Download Sample Data"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Typography>Send sample data of the dataset to email goes here</Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color={"secondary"}
          onClick={onSend}>
          Send Sample Data
        </Button>
        <Button
          onClick={onCancel}
          color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SampleDataDialog;
