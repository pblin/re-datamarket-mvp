import * as React from "react";
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {
  Grid,
  Hidden,
  ExpansionPanel,
  ExpansionPanelSummary,
  Tooltip
} from "@material-ui/core";
import AlbumIcon from "@material-ui/icons/Album";
import LocationIcon from "@material-ui/icons/AddLocation";
import DollarIcon from "@material-ui/icons/AttachMoney";
import AttachmentIcon from "@material-ui/icons/Attachment";

//TODO: Add more details
const SchemaList = ({schemas, history}) => {
  const handleClick = (schema) => {
    history.push(`/dataset/${schema.id}`);
  };
  
  return(
    <div>
      {schemas.map((schema, index) => (
          <ExpansionPanel key={`schema${index}`} expanded={false} className={"schema-panel"}>
            <ExpansionPanelSummary className={"schema-list"} onClick={() => handleClick(schema)}>
              <Grid container={true} justify={"flex-start"} className={"no-pad-right"}>
                <Grid item xs={10} sm={7} >
                  <div className={"fake-image"}>
                    <p>70 x 70</p>
                  </div>
                  <p className={"header"}>{schema.name}</p>
                  <p className={"sub-header"}>{schema.description}</p>
                  <p className={"description"}><b>ProfileName</b> <span>Date goes here</span></p>
                </Grid>
                <Hidden xsDown>
                  <Grid item xs={1}>
                    {schema['search_terms'].map((tag) => (
                      <p key={`tag-${tag}`} className={"search-tag"}>{tag}</p>
                    ))}
                  </Grid>
                  <Grid item xs={4}>
                    <Grid container>
                      <Grid item xs={6}>
                        <Tooltip title={"Number of records"} placement={"top-start"}>
                          <p className={"descriptor"}><AlbumIcon/> {schema["num_of_records"]} </p>
                        </Tooltip>
                        <Tooltip title={"Country"} placement={"top-start"}>
                        <p className={"descriptor"}><LocationIcon/> {schema["country"]} </p>
                        </Tooltip>
                        <Tooltip title={"State/Province"} placement={"top-start"}>
                          <p className={"descriptor"}><LocationIcon/> {schema["state_province"]} </p>
                        </Tooltip>
                      </Grid>
                      <Grid item xs={6}>
                        <Tooltip title={"File Type"} placement={"top-start"}>
                          <p className={"descriptor"}><AttachmentIcon/> JSON </p>
                        </Tooltip>
                        <Tooltip title={"High Asking Price"} placement={"top-start"}>
                          <p className={"descriptor money"}><DollarIcon/> {schema["price_high"]} </p>
                        </Tooltip>
                        <Tooltip title={"Low Asking Price"} placement={"top-start"}>
                          <p className={"descriptor money"}><DollarIcon/> {schema["price_low"]} </p>
                        </Tooltip>
                      </Grid>
                    </Grid>
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
