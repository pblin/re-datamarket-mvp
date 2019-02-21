import * as React from "react";
import "./common.css";
import {Grid, Typography, Paper, Button} from "@material-ui/core";

//TODO: Create Jumbo Button Component
//TODO: Create Jumbo Content Component
const JumboPaper = ({title, content, buttonText, handleClick}) => {
  return(
    <Grid container={true} justify={"center"}>
      <Paper className={"jumbo-paper"} elevation={1}>
        <Grid xs={12}>
          <Typography variant="h3" className={"jumbo-title"}>{title}</Typography>
        </Grid>
        <Grid xs={12}>
          <Typography variant="h5" className={"jumbo-title"}>{content}</Typography>
        </Grid>
        <Button className={"jumbo-button"} onClick={handleClick}>{buttonText}</Button>
      </Paper>
    </Grid>
  );
};

export default JumboPaper;
