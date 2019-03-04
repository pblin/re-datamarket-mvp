import * as React from "react";
import {
  Button,
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary
} from "@material-ui/core";

//TODO: Add more details
//TODO: refactor schemas to be datasets
const UserDatasetList = ({schemas, onEditClick}) => {
  return(
    <div>
      {schemas.map((schema, index) => (
          <ExpansionPanel key={`userSchema${index}`} expanded={false}>
            <ExpansionPanelSummary className={"schema-list"}>
              <Grid container={true} justify={"flex-start"}>
                <Grid item xs={11}>
                  <div className={"fake-image"}>
                    <p>70 x 70</p>
                  </div>
                  <p className={"header"}>{schema.name}</p>
                  <p className={"sub-header"}>{schema.description}</p>
                </Grid>
                <Grid item xs={1}>
                  <Button onClick={() =>{onEditClick(schema)}}>Edit</Button>
                </Grid>
              </Grid>
            </ExpansionPanelSummary>
        </ExpansionPanel>
      ))}
    </div>
  );
};

export default UserDatasetList;
