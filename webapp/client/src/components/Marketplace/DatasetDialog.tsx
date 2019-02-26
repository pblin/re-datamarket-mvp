import * as React from "react";
import DatasetManager from '../DatasetManager/DatasetManager';
import {Dialog, DialogContent, DialogTitle} from '@material-ui/core'

//TODO: Add more details
const DatasetDialog = ({open}) => {
  /*const handleClose = () => {
    console.log('HANDLING CLOSE');
  };*/

  return(
    <Dialog open={open} fullWidth={true}>
      <DialogTitle id="customized-dialog-title" >
        Create a new schema
      </DialogTitle>
      <DialogContent>
        <DatasetManager/>
      </DialogContent>
    </Dialog>
  );
};

export default DatasetDialog;
