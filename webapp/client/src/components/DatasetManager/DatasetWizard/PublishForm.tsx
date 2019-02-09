import * as React from "react";
import "./DatasetWizard.css";
import {Grid} from "@material-ui/core";

interface PublishFormProps {
  basicDetails: any,
}

export class PublishForm extends React.Component<PublishFormProps> {
  state: any;

  constructor(props: PublishFormProps) {
    super(props);
  }

  //TODO: Convert to tab display
  render() {
    let basicDetails = JSON.stringify(this.props.basicDetails, undefined, 2);
    return (
      <Grid container={true} justify={'flex-start'}>
          <Grid item xs={12} sm={3} />
          <Grid item xs={12} sm={6} alignContent={'center'}>
              <pre className="json-details">
                {basicDetails}
              </pre>
          </Grid>
      </Grid>
    )
  }
}
