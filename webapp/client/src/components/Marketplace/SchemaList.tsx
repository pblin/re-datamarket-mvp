import * as React from "react";
import {
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "@material-ui/core";

//TODO: Make responsive
const SchemaList = ({schemas}) => {
  console.log('SCHEMAS');
  console.log(schemas);
  return(
    <div>
      {schemas.map(schema => (
          <ExpansionPanel>
            <ExpansionPanelSummary className={"schema-list"}>
              <Grid container={true} justify={"flex-start"}>
                <Grid item xs={1}>
                  <div className={"fake-image"}>
                    <p>70 x 70</p>
                  </div>
                </Grid>
                <Grid item xs={8}>
                  <p className={"header"}>{schema.name}</p>
                  <p className={"sub-header"}>{schema.description}</p>
                  <p className={"description"}><b>ProfileName</b> <span>Date goes here</span></p>
                </Grid>
                <Grid item xs={3}>
                  more content
                </Grid>
              </Grid>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>Here are some details</ExpansionPanelDetails>
          </ExpansionPanel>
      ))}
    </div>
  );
};

export default SchemaList;
