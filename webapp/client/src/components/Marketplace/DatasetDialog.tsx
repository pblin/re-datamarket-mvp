import * as React from "react";
import DatasetManager from '../DatasetManager/DatasetManager';
import {
 // AppBar,
  Dialog,
  DialogContent,
  //DialogActions,
 // DialogTitle,
 // IconButton,
  Typography
} from '@material-ui/core';
//import CloseIcon from '@material-ui/icons/Close';
import Toolbar from "@material-ui/core/Toolbar";
//import Button from "@material-ui/core/Button";

//TODO: Add more details
const DatasetDialog = ({open, onClose}) => {
  /*const handleClose = () => {
    console.log('HANDLING CLOSE');
    onClose();
  };*/

  return(
    <Dialog open={open} fullScreen={true} className={"marketplace-dialog"}>
        <Toolbar className={"dialog-toolbar"}>
          <Typography variant="h6" color="inherit">
            Create a new schema
          </Typography>
        </Toolbar>
      <DialogContent>
        <DatasetManager/>
      </DialogContent>
    </Dialog>
  );
};

export default DatasetDialog;
