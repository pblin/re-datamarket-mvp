import * as React from "react";
import {
  IconButton,
  Chip,
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography
} from "@material-ui/core";

import TrashIcon from "@material-ui/icons/Delete";
import JumboPaper from "../Common/jumboPaper";

//TODO: refactor schemas to be datasets
const UserDatasetList = ({schemas, onDeleteClick, onAddClicked, history}) => {
  const handleClick = (schema) => {
    history.push(`/dataset/${schema.id}`);
  };

  const handleDelete = (event, schema) => {
    event.stopPropagation();
    onDeleteClick(schema)
  };

  const renderChips = (schema) => {
    console.log('rendering chips');
    console.log(schema);
    if(schema.stage == 2) {
      return <Chip label={"Saved"} className={"save-chip"}/>;
    } else if(schema.stage == 3) {
      return <Chip label={"Published"} className={"published-chip"} />  ;
    }
  };

  const renderSchemaList = () => {
    return <div>{schemas.map((schema, index) => (
      <ExpansionPanel key={`userSchema${index}`} expanded={false} onClick={() => handleClick(schema)}>
        <ExpansionPanelSummary className={"schema-list"}>
          <Grid container={true} justify={"flex-start"} className={"no-pad-right"}>
            <Grid item xs={6} sm={9}>
              <div className={"fake-image-own"}>
                <p>50</p>
              </div>
              <Typography variant={"subtitle1"} className={"header"}>{schema.name}</Typography>
              <Typography variant={"subtitle2"} className={"sub-header"}>
                {schema.description} {renderChips(schema)}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3} className={"action-container"}>
              <Grid container justify={"flex-end"}>
                <IconButton onClick={(e)=>{handleDelete(e, schema)}}> <TrashIcon/></IconButton>
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
