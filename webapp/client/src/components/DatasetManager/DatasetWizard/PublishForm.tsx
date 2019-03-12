import * as React from "react";
import "./DatasetWizard.scss";
import {Divider, Grid, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";

interface PublishFormProps {
  basicDetails: any;
  schema: any;
  schemaPublished: boolean;
  schemaPublishedId: string;
  handleClose: any;
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
          <Grid item xs={12}>
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
          <Grid item xs={12}>
          Schema
          <Divider/>
        {this.props.schema.map((schema, index) => (
          <Typography key={`schema${index}`}><b>{schema.name}</b> {schema.type}</Typography>
          ))}
          </Grid>
        </div>)}
        {this.props.schemaPublished && (
          <div>Dataset was published
            <Link to={`/dataset/${this.props.schemaPublishedId}`} onClick={this.props.handleClose}>Go to details</Link>
          </div>
        )}
      </Grid>
    )
  }
}
