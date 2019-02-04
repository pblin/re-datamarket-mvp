import * as React from "react";
import {TextField} from "@material-ui/core";

interface BasicInfoProps {
  onChange: any;
}

interface BasicInfoState {}

export class BasicInfo extends React.Component<BasicInfoProps, BasicInfoState> {
  state: any;

  constructor(props: BasicInfoProps) {
    super(props);
    this.state = {
      description: '1234',
      searchTerms: 'test',
      sampleAPIKey: 'test1234',
      endpoint: 'http://test.com',
      sampleDataKey: '12341234',
      records: 1000,
      askPriceHigh: 1,
      askPriceLow: 10
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: any, key: string): void {
    console.log('Here is the event');
    console.log(event);
    console.log(key);
    let state = {};
    state[key] = event.target.value;
    this.setState(state);
    this.props.onChange();
  }

  render() {
    return (
      <form>
        <h1>Basic Info</h1>
        <TextField
          autoFocus={true}
          label="Description"
          variant="outlined"
          margin="normal"
          error={true}
          helperText="Please provide a description"
          value={this.state.description}
          onChange={(event) => this.handleChange(event, 'description')}
        />
        <TextField
          label="Search Terms"
          variant="outlined"
          margin="normal"
          value={this.state.searchTerms}
          onChange={(event) => this.handleChange(event, 'searchTerms')}
        />
        <TextField
          label="Sample Api Key"
          variant="outlined"
          margin="normal"
          value={this.state.sampleAPIKey}
          onChange={(event) => this.handleChange(event, 'sampleAPIKey')}
        />
        <TextField
          label="Endpoint URL"
          variant="outlined"
          margin="normal"
          value={this.state.endpoint}
          onChange={(event) => this.handleChange(event, 'endpoint')}
        />
        <TextField
          label="Sample Data Key"
          variant="outlined"
          margin="normal"
          value={this.state.sampleDataKey}
          onChange={(event) => this.handleChange(event, 'sampleDataKey')}
        />
        <TextField
          label="# of records"
          variant="outlined"
          margin="normal"
          type="number"
          value={this.state.records}
          onChange={(event) => this.handleChange(event, 'records')}
        />
        <TextField
          label="Ask Price (low)"
          variant="outlined"
          margin="normal"
          type="number"
          value={this.state.askPriceHigh}
          onChange={(event) => this.handleChange(event, 'askPriceHigh')}
        />
        <TextField
          label="Ask Price (high)"
          variant="outlined"
          margin="normal"
          type="number"
          value={this.state.askPriceLow}
          onChange={(event) => this.handleChange(event, 'askPriceLow')}
        />
      </form>
    )
  }
}
