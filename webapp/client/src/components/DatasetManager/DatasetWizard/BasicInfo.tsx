import * as React from "react";
import {Grid, TextField} from "@material-ui/core";
import {ValidatedTextField} from "../../Common/Validator";
import "./DatasetWizard.css";
import {ERROR_TYPE} from "../../Common/ErrorType";

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
      askPriceLow: 10,
      test: '',
      errors: []
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

    //TODO: Write validators
    if(this.state[key] == '') {

    }
  }

  onValidate() {
    console.log('On Validation');
  }

  render() {
    return (
      <Grid container={true} justify="center">
        <form className="basic-form">
          <Grid spacing={24} container={true} >
            <Grid item xs={12} sm={6}>
              <ValidatedTextField
                value={this.state.test}
                errorText="Please enter a valid test"
                label={'Test Validator'}
                onValidate={this.onValidate}
                required
                errors={[
                  {type: ERROR_TYPE.REQUIRED},
                  {type: ERROR_TYPE.MAX_LENGTH, val: 7},
                  {type: ERROR_TYPE.MIN_LENGTH, val: 3},
                  {type: ERROR_TYPE.PATTERN, val: /^hello/}
                ]}
                errorMessages={[
                  'Please enter a valid test',
                  'Please make sure test field is less than 7 characters',
                  'Please make sure test field is greater than 3 characters',
                  'Please include hello in the field'
                ]}
                margin="normal"
                onChange={(event) => this.handleChange(event, 'test')}
                variant={'outlined'}
                helperText="Test Field"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus={true}
                label="Description"
                variant="outlined"
                margin="normal"
                error={true}
                fullWidth
                helperText="Please provide a description"
                value={this.state.description}
                onChange={(event) => this.handleChange(event, 'description')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Search Terms"
                variant="outlined"
                margin="normal"
                fullWidth
                value={this.state.searchTerms}
                onChange={(event) => this.handleChange(event, 'searchTerms')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Sample Api Key"
                variant="outlined"
                margin="normal"
                fullWidth
                value={this.state.sampleAPIKey}
                onChange={(event) => this.handleChange(event, 'sampleAPIKey')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Endpoint URL"
                variant="outlined"
                margin="normal"
                fullWidth
                value={this.state.endpoint}
                onChange={(event) => this.handleChange(event, 'endpoint')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Sample Data Key"
                variant="outlined"
                margin="normal"
                fullWidth
                value={this.state.sampleDataKey}
                onChange={(event) => this.handleChange(event, 'sampleDataKey')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="# of records"
                variant="outlined"
                margin="normal"
                type="number"
                fullWidth
                value={this.state.records}
                onChange={(event) => this.handleChange(event, 'records')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Ask Price (low)"
                variant="outlined"
                margin="normal"
                fullWidth
                type="number"
                value={this.state.askPriceHigh}
                onChange={(event) => this.handleChange(event, 'askPriceHigh')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Ask Price (high)"
                variant="outlined"
                margin="normal"
                fullWidth
                type="number"
                value={this.state.askPriceLow}
                onChange={(event) => this.handleChange(event, 'askPriceLow')}
              />
            </Grid>
          </Grid>
        </form>
      </Grid>
    )
  }
}
