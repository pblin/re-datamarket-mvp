import * as React from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Typography
} from "@material-ui/core";
import BasicInfoForm from "../DatasetManager/DatasetWizard/BasicInfoForm";

const BasicInfoModal = ({onSave, onSubmit}) => {
  return(
    <Dialog open={false} maxWidth={"md"}>
      <DialogTitle>
        <Typography className={"dialog-header"}>
          <span className={"bold"}>UPDATE DATASET INFO</span>
        </Typography>
        <Typography className={"dialog-subheader"}>
         Update Dataset Information Here
        </Typography>
      </DialogTitle>
        <DialogContent>
          <BasicInfoForm onSubmit={onSubmit}/>
        </DialogContent>
       <DialogActions>
         <Button
           color={"secondary"}
           variant={"contained"}
           className={"dataset-buy"}
           onClick={onSave}>
           SAVE
         </Button>
       </DialogActions>
    </Dialog>
  );
};

export default BasicInfoModal;
