import * as React from "react";
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {
  Grid,
  Hidden,
  ExpansionPanel,
  ExpansionPanelSummary,
  Tooltip,
  Typography
} from "@material-ui/core";
import AlbumIcon from "@material-ui/icons/Album";
import LocationIcon from "@material-ui/icons/AddLocation";
import DollarIcon from "@material-ui/icons/AttachMoney";
import AttachmentIcon from "@material-ui/icons/Attachment";

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
                  <Typography className={"header"} variant={"subtitle1"}>{schema.name}</Typography>
                  <Typography className={"sub-header"} variant={"subtitle2"}>{schema.description}</Typography>
                  <Typography className={"description"}><b>ProfileName</b> <span>Date goes here</span></Typography>
                </Grid>
                <Hidden xsDown>
                  <Grid item xs={1}>
                    {schema['search_terms'].map((tag) => (
                      <Typography
                        key={`tag-${tag}-${index * Math.random()}`}
                        className={"search-tag"}
                        variant={"body2"}>{tag}
                      </Typography>
                    ))}
                  </Grid>
                  <Grid item xs={4}>
                    <Grid container>
                      <Grid item xs={6}>
                        <Tooltip title={"Number of records"} placement={"top-start"}>
                          <Typography variant={"body2"} className={"descriptor"}><AlbumIcon/> {schema["num_of_records"]} </Typography>
                        </Tooltip>
                        <Tooltip title={"Country"} placement={"top-start"}>
                          <Typography variant={"body2"} className={"descriptor"}><LocationIcon/> {schema["country"]} </Typography>
                        </Tooltip>
                        <Tooltip title={"State/Province"} placement={"top-start"}>
                          <Typography variant={"body2"} className={"descriptor"}><LocationIcon/> {schema["state_province"]} </Typography>
                        </Tooltip>
                      </Grid>
                      <Grid item xs={6}>
                        <Tooltip title={"File Type"} placement={"top-start"}>
                          <Typography variant={"body2"} className={"descriptor"}><AttachmentIcon/> JSON </Typography>
                        </Tooltip>
                        <Tooltip title={"High Asking Price"} placement={"top-start"}>
                          <Typography variant={"body2"} className={"descriptor money"}><DollarIcon/> {schema["price_high"]} </Typography>
                        </Tooltip>
                        <Tooltip title={"Low Asking Price"} placement={"top-start"}>
                          <Typography variant={"body2"} className={"descriptor money"}><DollarIcon/> {schema["price_low"]} </Typography>
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
