import * as React from "react";
import DatasetManager from '../DatasetManager/DatasetManager';
import {Dialog, DialogContent, DialogTitle, Fab} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

//TODO: Add more details
const DatasetDialog = ({open, onClose}) => {
  const handleClose = () => {
    console.log('HANDLING CLOSE');
    onClose();
  };

  return(
    <Dialog open={open} fullWidth={true} className={"marketplace-dialog"}>
      <DialogTitle id="customized-dialog-title" >
        Create a new schema
        <Fab className={"close-button"} onClick={handleClose}><CloseIcon/></Fab>
      </DialogTitle>
      <DialogContent>
        <DatasetManager/>
      </DialogContent>
    </Dialog>
  );
};

export default DatasetDialog;
