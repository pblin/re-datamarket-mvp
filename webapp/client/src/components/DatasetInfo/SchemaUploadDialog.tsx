import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Typography
} from "@material-ui/core";
import {SchemaUpload} from "../DatasetManager/DatasetWizard/SchemaUpload";
import Button from "@material-ui/core/Button";

const SchemaUploadDialog = ({isOpen = false, onCancel}) => {
  return(
    <Dialog open={isOpen} maxWidth={"lg"}>
      <DialogTitle>
        <Typography className={"dialog-header"}>
          <span className={"bold"}>UPLOAD NEW SCHEMA</span>
        </Typography>
        <Typography className={"dialog-subheader"}>
          Upload a new schema for your dataset
        </Typography>
      </DialogTitle>
      <DialogContent>
        <SchemaUpload
          onSchemaUpload={() => {}}
          schema={[]}
          displayNoSchemaError={false}
          onSchemaFileChange={() => {}}
          errors={[]}
          schemaFile={''}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SchemaUploadDialog;
