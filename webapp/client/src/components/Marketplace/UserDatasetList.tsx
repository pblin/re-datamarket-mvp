import * as React from "react";
import {
  IconButton,
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary
} from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";
import TrashIcon from "@material-ui/icons/Delete";

//TODO: Add more details
//TODO: refactor schemas to be datasets
const UserDatasetList = ({schemas, onEditClick, onDeleteClick}) => {
  return(
    <div>
      {schemas.map((schema, index) => (
          <ExpansionPanel key={`userSchema${index}`} expanded={false}>
            <ExpansionPanelSummary className={"schema-list"}>
              <Grid container={true} justify={"flex-start"} className={"no-pad-right"}>
                <Grid item xs={6} sm={9}>
                  <div className={"fake-image-own"}>
                    <p>50 x 50</p>
                  </div>
                  <p className={"header"}>{schema.name}</p>
                  <p className={"sub-header"}>{schema.description}</p>
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
      ))}
    </div>
  );
};

export default UserDatasetList;
