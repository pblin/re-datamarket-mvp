import * as React from "react";
import {Grid} from "@material-ui/core";
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
      description: '',
      searchTerms: '',
      country: '',
      state: '',
      sampleAPIKey: '',
      endpoint: '',
      sampleDataKey: '',
      records: undefined,
      askPriceHigh: undefined,
      askPriceLow: undefined,
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
            <Grid item xs={12} sm={12}>
              <ValidatedTextField
                value={this.state.test}
                label={'Test Validator'}
                onValidate={this.onValidate}
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
            <Grid item xs={12} sm={5}>
              <ValidatedTextField
                value={this.state.description}
                label={'Description'}
                onValidate={this.onValidate}
                errors={[
                  {type: ERROR_TYPE.REQUIRED},
                ]}
                errorMessages={[
                  'Please enter a valid description'
                ]}
                margin="normal"
                onChange={(event) => this.handleChange(event, 'description')}
                variant={'outlined'}
                helperText="Description"
                autoFocus={true}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <ValidatedTextField
                value={this.state.searchTerms}
                label={'Search Terms'}
                onValidate={this.onValidate}
                errors={[
                  {type: ERROR_TYPE.REQUIRED},
                ]}
                errorMessages={[
                  'Please enter valid search terms'
                ]}
                margin="normal"
                onChange={(event) => this.handleChange(event, 'searchTerms')}
                variant={'outlined'}
                helperText="Search Terms"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <ValidatedTextField
                value={this.state.state}
                label={'State/Province'}
                select
                onValidate={this.onValidate}
                errors={[
                  {type: ERROR_TYPE.REQUIRED},
                ]}
                errorMessages={[
                  'Please select a state or province'
                ]}
                margin="normal"
                onChange={(event) => this.handleChange(event, 'state')}
                variant={'outlined'}
                helperText="State"
                options={[
                  {key: 'ny', value: 'New York'},
                  {key: '', value: ''}
                ]}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <ValidatedTextField
                value={this.state.country}
                label={'Country'}
                select
                onValidate={this.onValidate}
                errors={[
                  {type: ERROR_TYPE.REQUIRED},
                ]}
                errorMessages={[
                  'Please select a country'
                ]}
                margin="normal"
                onChange={(event) => this.handleChange(event, 'country')}
                variant={'outlined'}
                helperText="Country"
                options={[{key: 'usa', value: 'United States Of America'}]}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ValidatedTextField
                value={this.state.sampleAPIKey}
                label={'Sample Api Key'}
                onValidate={this.onValidate}
                errors={[
                  {type: ERROR_TYPE.REQUIRED},
                ]}
                errorMessages={[
                  'Please enter a valid sample Api key'
                ]}
                margin="normal"
                onChange={(event) => this.handleChange(event, 'sampleAPIKey')}
                variant={'outlined'}
                helperText="Sample Api Key"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ValidatedTextField
                value={this.state.endpoint}
                label={'Endpoint'}
                onValidate={this.onValidate}
                errors={[
                  {type: ERROR_TYPE.REQUIRED},
                ]}
                errorMessages={[
                  'Please enter a valid endpoint'
                ]}
                margin="normal"
                onChange={(event) => this.handleChange(event, 'endpoint')}
                variant={'outlined'}
                helperText="Endpoint"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ValidatedTextField
                value={this.state.sampleDataKey}
                label={'Sample Data Key'}
                onValidate={this.onValidate}
                errors={[
                  {type: ERROR_TYPE.REQUIRED},
                ]}
                errorMessages={[
                  'Please enter a valid sample data key'
                ]}
                margin="normal"
                onChange={(event) => this.handleChange(event, 'sampleDataKey')}
                variant={'outlined'}
                helperText="Sample Data Key"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <ValidatedTextField
                value={this.state.records}
                label={'# of records'}
                onValidate={this.onValidate}
                errors={[
                  {type: ERROR_TYPE.REQUIRED},
                  {type: ERROR_TYPE.GREATER_THAN, val: 0}
                ]}
                errorMessages={[
                  'Please enter a valid number of records',
                  'Please ensure that the number of records are greater than 0'
                ]}
                margin="normal"
                onChange={(event) => this.handleChange(event, 'records')}
                variant={'outlined'}
                helperText="Records"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <ValidatedTextField
                value={this.state.askPriceLow}
                label={'Ask Price (low)'}
                onValidate={this.onValidate}
                errors={[
                  {type: ERROR_TYPE.REQUIRED},
                  {type: ERROR_TYPE.MAX, val: this.state.askPriceHigh},
                  {type: ERROR_TYPE.MIN, val: 0}
                ]}
                errorMessages={[
                  'Please enter a valid ask price',
                  'Please ensure that the low ask price is not greater than the high ask price',
                  'Please enter a positive asking price'
                ]}
                margin="normal"
                onChange={(event) => this.handleChange(event, 'askPriceLow')}
                variant={'outlined'}
                helperText="Ask Price Low"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <ValidatedTextField
                value={this.state.askPriceHigh}
                label={'Ask Price (high)'}
                onValidate={this.onValidate}
                errors={[
                  {type: ERROR_TYPE.REQUIRED},
                  {type: ERROR_TYPE.MIN, val: this.state.askPriceLow},
                  {type: ERROR_TYPE.MIN, val: 0}
                ]}
                errorMessages={[
                  'Please enter a valid ask price',
                  'Please ensure that the high ask price is not less than the low ask price',
                  'Please enter a positive asking price'
                ]}
                margin="normal"
                onChange={(event) => this.handleChange(event, 'askPriceHigh')}
                variant={'outlined'}
                helperText="Ask Price High"
                fullWidth
              />
            </Grid>
          </Grid>
        </form>
      </Grid>
    )
  }
}
