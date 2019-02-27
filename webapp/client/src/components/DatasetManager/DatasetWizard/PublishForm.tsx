import * as React from "react";
import "./DatasetWizard.css";
import {Divider, Grid, Typography} from "@material-ui/core";

interface PublishFormProps {
  basicDetails: any;
  schema: any;
  schemaPublished: boolean;
}

export class PublishForm extends React.Component<PublishFormProps> {
  state: any;

  constructor(props: PublishFormProps) {
    super(props);
  }

  //TODO: Convert to tab display
  render() {
    return (
      <Grid container={true} justify={'flex-start'}>
        {!this.props.schemaPublished && (<div>
          <Grid item xs={4}>
            Basic Information
            <Divider/>
            <Typography><b>Dataset Name:</b> {this.props.basicDetails.name}</Typography>
            <Typography><b>Dataset Description:</b> {this.props.basicDetails.description}</Typography>
            <Typography><b>Search Terms:</b> {this.props.basicDetails.searchTerms}</Typography>
            <Typography><b>State:</b> {this.props.basicDetails.state}</Typography>
            <Typography><b>Country:</b> {this.props.basicDetails.country}</Typography>
            <Typography><b>Endpoint:</b> {this.props.basicDetails.endpoint}</Typography>
            <Typography><b>Sample API Key:</b> {this.props.basicDetails.sampleAPIKey}</Typography>
            <Typography><b>Sample Dataset Key:</b> {this.props.basicDetails.sampleDatasetKey}</Typography>
            <Typography><b>Records:</b> {this.props.basicDetails.records}</Typography>
            <Typography><b>Low Asking Price:</b> {this.props.basicDetails.askPriceLow}$</Typography>
            <Typography><b>High Asking Price:</b> {this.props.basicDetails.askPriceHigh}$</Typography>
          </Grid>
          <Grid item xs={8}>
          Schema
          <Divider/>
        {this.props.schema.map((schema, index) => (
          <Typography key={`schema${index}`}><b>{schema.name}</b> {schema.type}</Typography>
          ))}
          </Grid>
        </div>)}
        {this.props.schemaPublished && (
          <div>Schema was published</div>
        )}
      </Grid>
    )
  }
}
