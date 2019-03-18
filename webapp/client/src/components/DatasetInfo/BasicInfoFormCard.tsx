import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader
} from "@material-ui/core";
import BasicInfoForm from "../DatasetManager/DatasetWizard/BasicInfoForm";

const BasicInfoFormCard = () => {
  return(
    <Card>
      <CardHeader
        title={`Update Dataset Information`}
        subheader={``}
      ></CardHeader>
      <CardContent>
        <BasicInfoForm mode={'card'}/>
      </CardContent>
    </Card>
  );
};

export default BasicInfoFormCard;
