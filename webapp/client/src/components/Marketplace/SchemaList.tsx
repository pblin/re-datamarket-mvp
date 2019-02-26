import * as React from "react";
import {
  Grid,
  Hidden,
  ExpansionPanel,
  ExpansionPanelSummary
} from "@material-ui/core";

//TODO: Add more details
const SchemaList = ({schemas}) => {
  return(
    <div>
      {schemas.map((schema, index) => (
          <ExpansionPanel key={`schema${index}`} expanded={false}>
            <ExpansionPanelSummary className={"schema-list"}>
              <Grid container={true} justify={"flex-start"}>
                <Grid item xs={4} sm={2} md={1}>
                  <div className={"fake-image"}>
                    <p>70 x 70</p>
                  </div>
                </Grid>
                <Grid item xs={8} sm={6} md={7}>
                  <p className={"header"}>{schema.name}</p>
                  <p className={"sub-header"}>{schema.description}</p>
                  <p className={"description"}><b>ProfileName</b> <span>Date goes here</span></p>
                </Grid>
                <Hidden xsDown>
                  <Grid item xs={2}>
                    <p> Tags Will Go Here</p>
                  </Grid>
                  <Grid item xs={2}>
                    Content
                  </Grid>
                </Hidden>
              </Grid>
            </ExpansionPanelSummary>
          </ExpansionPanel>
      ))}
    </div>
  );
};

export default SchemaList;
