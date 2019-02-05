import * as React from "react";
import {Grid} from "@material-ui/core";
import {ValidatedTextField} from "../../Common/Validator";
import "./DatasetWizard.css";
import {ERROR_TYPE} from "../../Common/ErrorType";

interface BasicInfoProps {
  onFormChange: any;
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
      state: 'New York',
      sampleAPIKey: '',
      endpoint: '',
      sampleDataKey: '',
      records: undefined,
      askPriceHigh: undefined,
      askPriceLow: undefined,
      test: '',
      errors: []
    };
    //this.handleChange = this.handleChange.bind(this);
    this.onValidate = this.onValidate.bind(this);
  }

  /*handleChange(event: any, key: string): void {
    let state = {};
    state[key] = event.target.value;
    this.setState(state);
    this.props.onChange();

  }*/

  onValidate(event: any, key: string, isValid: boolean) {
    console.log('On Validation');
    console.log(event);
    console.log(key);
    console.log(isValid);
    let state = {};
    state[key] = event.target.value;
    this.setState(state);
    //this.props.onChange();
    this.props.onFormChange(key, event.target.value, isValid);
  }

  componentDidMount() {
    console.log('Component Did mount');
    let form = document.getElementById('basic-info');
    console.log(form);
    console.log((form as any).description.checkValidity())
  }

  render() {
    return (
      <Grid container={true} justify="center">
        <form className="basic-form" id="basic-info">
          <Grid spacing={24} container={true} >
            <Grid item xs={12} sm={5}>
              <ValidatedTextField
                ref="description"
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
                variant={'outlined'}
                helperText="Description"
                errorText={"test"}
                autoFocus={true}
                name="description"
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
                variant={'outlined'}
                name='searchTerms'
                helperText="Search Terms"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <ValidatedTextField
                value={this.state.state}
                label={'State/Province'}
                name='state'
                select
                onValidate={this.onValidate}
                errors={[
                  {type: ERROR_TYPE.REQUIRED},
                ]}
                errorMessages={[
                  'Please select a state or province'
                ]}
                margin="normal"
                variant={'outlined'}
                helperText="State"
                options={[
                  {key: 'ny', value: 'New York'}
                ]}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <ValidatedTextField
                value={this.state.country}
                label={'Country'}
                name='country'
                select
                onValidate={this.onValidate}
                errors={[
                  {type: ERROR_TYPE.REQUIRED},
                ]}
                errorMessages={[
                  'Please select a country'
                ]}
                margin="normal"
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
                name='sampleAPIKey'
                errors={[
                  {type: ERROR_TYPE.REQUIRED},
                ]}
                errorMessages={[
                  'Please enter a valid sample Api key'
                ]}
                margin="normal"
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
                name='endpoint'
                errors={[
                  {type: ERROR_TYPE.REQUIRED},
                  {type: ERROR_TYPE.IS_URL}
                ]}
                errorMessages={[
                  'Please enter a valid endpoint',
                  'Please enter a valid url'
                ]}
                margin="normal"
                variant={'outlined'}
                helperText="Endpoint"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ValidatedTextField
                value={this.state.sampleDataKey}
                label={'Sample Data Key'}
                name='sampleDataKey'
                onValidate={this.onValidate}
                errors={[
                  {type: ERROR_TYPE.REQUIRED},
                ]}
                errorMessages={[
                  'Please enter a valid sample data key'
                ]}
                margin="normal"
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
                name='records'
                errors={[
                  {type: ERROR_TYPE.REQUIRED},
                  {type: ERROR_TYPE.GREATER_THAN, val: 0}
                ]}
                errorMessages={[
                  'Please enter a valid number of records',
                  'Please ensure that the number of records are greater than 0'
                ]}
                margin="normal"
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
                name='askPriceLow'
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
                name='askPriceHigh'
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
