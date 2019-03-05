import * as React from "react";
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {
  Grid,
  Hidden,
  ExpansionPanel,
  ExpansionPanelSummary
} from "@material-ui/core";

//TODO: Add more details
const SchemaList = ({schemas, history}) => {
  const handleClick = (schema) => {
    history.push(`/dataset/${schema.id}`);
  };
  console.log('HERE ARE THE SCHEMAS');
  console.log(schemas);
  return(
    <div>
      {schemas.map((schema, index) => (
          <ExpansionPanel key={`schema${index}`} expanded={false}>
            <ExpansionPanelSummary className={"schema-list"} onClick={() => handleClick(schema)}>
              <Grid container={true} justify={"flex-start"}>
                <Grid item xs={10} sm={8} >
                  <div className={"fake-image"}>
                    <p>70 x 70</p>
                  </div>
                  <p className={"header"}>{schema.name}</p>
                  <p className={"sub-header"}>{schema.description}</p>
                  <p className={"description"}><b>ProfileName</b> <span>Date goes here</span></p>
                </Grid>
                <Hidden xsDown>
                  <Grid item xs={2}>
                    {schema['search_terms'].map((tag) => (
                      <p className={"search-tag"}>{tag}</p>
                    ))}
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
