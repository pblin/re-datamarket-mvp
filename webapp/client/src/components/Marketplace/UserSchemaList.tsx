import * as React from "react";
import {
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary
} from "@material-ui/core";

//TODO: Add more details
const UserSchemaList = ({schemas}) => {
  return(
    <div>
      {schemas.map((schema, index) => (
          <ExpansionPanel key={`userSchema${index}`} expanded={false}>
            <ExpansionPanelSummary className={"schema-list"}>
              <Grid container={true} justify={"flex-start"}>
                <Grid item xs={8} sm={6} md={7}>
                  <p className={"header"}>{schema.name}</p>
                  <p className={"sub-header"}>{schema.description}</p>
                </Grid>
                <Grid item xs={2}>
                  User Controls go here
                </Grid>
              </Grid>
            </ExpansionPanelSummary>
        </ExpansionPanel>
      ))}
    </div>
  );
};

export default UserSchemaList;
