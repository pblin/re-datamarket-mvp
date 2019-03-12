import * as React from "react";
import {
  IconButton,
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography
} from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";
import TrashIcon from "@material-ui/icons/Delete";
import JumboPaper from "../Common/jumboPaper";

//TODO: Add more details
//TODO: refactor schemas to be datasets
const UserDatasetList = ({schemas, onEditClick, onDeleteClick, onAddClicked}) => {
  const renderSchemaList = () => {
    return <div>{schemas.map((schema, index) => (
      <ExpansionPanel key={`userSchema${index}`} expanded={false}>
        <ExpansionPanelSummary className={"schema-list"}>
          <Grid container={true} justify={"flex-start"} className={"no-pad-right"}>
            <Grid item xs={6} sm={9}>
              <div className={"fake-image-own"}>
                <p>50</p>
              </div>
              <Typography variant={"subtitle1"} className={"header"}>{schema.name}</Typography>
              <Typography variant={"body1"} className={"sub-header"}>{schema.description}</Typography>
            </Grid>
            <Grid item xs={6} sm={3} className={"action-container"}>
              <Grid container justify={"flex-end"}>
                <IconButton onClick={() =>{onEditClick(schema)}}> <EditIcon/></IconButton>
                <IconButton onClick={()=>{onDeleteClick(schema)}}> <TrashIcon/></IconButton>
              </Grid>
            </Grid>
          </Grid>
        </ExpansionPanelSummary>
      </ExpansionPanel>
    ))}</div>
  };

  const renderJumboPaper = () => {
    return  <JumboPaper
      title={"No Datasets Found"}
      content={"Create a new Dataset by clicking on the button below"}
      buttonText={"Create Dataset"}
      handleClick={() => {onAddClicked()}}
    />
  };

  return(
    <div className={"schema-list"}>
      {schemas.length != 0 && renderSchemaList()}
      {schemas.length == 0 && renderJumboPaper()}
    </div>
  );
};

export default UserDatasetList;
