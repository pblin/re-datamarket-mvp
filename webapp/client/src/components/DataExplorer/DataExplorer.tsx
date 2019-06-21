import * as React from "react";
import {withRouter} from "react-router";
import {withSnackbar} from "notistack";
import NotificationLabel from "../Common/NotificationLabel";
import {Grid} from "@material-ui/core";

interface ComponentProps {
}

interface ComponentState {
}

class DataExplorer extends React.Component<ComponentProps, ComponentState> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <Grid container justify={"center"}>
          <Grid item xs={8}>
            <NotificationLabel
              type={"warning"}
            >
              <p>This page is under construction</p>
            </NotificationLabel>
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }
}

//@ts-ignore
DataExplorer = withSnackbar(DataExplorer);

//@ts-ignore
export default withRouter(DataExplorer);
