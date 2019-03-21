import * as React from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader
} from "@material-ui/core";
import BasicInfoForm from "../DatasetManager/DatasetWizard/BasicInfoForm";

const BasicInfoFormCard = ({onSave, onSubmit}) => {
  return(
    <Card>
      <CardHeader
        title={`Update Dataset Information`}
        subheader={``}
      ></CardHeader>
      <CardContent>
        <BasicInfoForm mode={'card'} onSubmit={onSubmit}/>
        <Button
          color={"secondary"}
          variant={"contained"}
          className={"dataset-buy"}
          onClick={onSave}>
          SAVE
        </Button>
      </CardContent>
    </Card>
  );
};

export default BasicInfoFormCard;
