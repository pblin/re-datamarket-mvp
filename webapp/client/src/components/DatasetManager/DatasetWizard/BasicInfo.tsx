import * as React from "react";
import {Grid} from "@material-ui/core";
import {ValidatedTextField} from "../../Common/Validator";
import "./DatasetWizard.css";
import {ERROR_TYPE} from "../../Common/ErrorType";

interface BasicInfoProps {
  onFormChange: any;
  basicInfo: any; //TODO: Typecast this
  submitting: boolean;
  submitted: boolean;
  onSubmit: any;
}

interface BasicInfoState {}

export class BasicInfo extends React.Component<BasicInfoProps, BasicInfoState> {
  state: any;
  inputLength: number;
  counter: number = 0;
  validatedInputs: any[] = [];

  constructor(props: BasicInfoProps) {
    super(props);
    this.onValidate = this.onValidate.bind(this);
    this.onForcedValidation = this.onForcedValidation.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  onValidate(value: any, key: string, isValid: boolean) {
    //if(this.props.basicInfo[key] != value) {
      this.props.onFormChange(key, value, isValid);
      if(this.props.submitting) {
        this.counter++;
      }
      console.log(this.counter);
      if(this.counter == this.inputLength) {
        console.log('FIRE EVENT HERE');
        this.props.onSubmit();
      }
    //}
  }

  onValidationComplete() {

  }

  onForcedValidation(value: any, key: string, isValid: boolean) {
    this.validatedInputs.push({key, value, isValid});
    if(this.validatedInputs.length == this.inputLength) {
      this.props.onSubmit(this.validatedInputs);
    }
  }

  shouldComponentUpdate(nextProps: Readonly<any>, nextState: Readonly<{}>): boolean {
    console.log('Basic Info');
    console.log(nextProps);
    console.log(nextState);
    return nextProps.submitted == false;
  }

  componentDidMount() {
    const form = document.getElementById('basic-info');
    let fields = form.querySelectorAll('.basic-form-input');
    this.inputLength = fields.length;
  }

  render() {
    return (
      <Grid container={true} justify="center">
        <form className="basic-form" id="basic-info">
          <Grid spacing={24} container={true} >
            <Grid item xs={12} sm={5}>
              <ValidatedTextField
                className="basic-form-input"
                ref="description"
                value={this.props.basicInfo.description}
                label={'Description'}
                onValidate={this.onValidate}
                onForcedValidation={this.onForcedValidation}
                errors={[
                  {type: ERROR_TYPE.REQUIRED},
                ]}
                errorMessages={[
                  'Please enter a valid description'
                ]}
                margin="normal"
                variant={'outlined'}
                helperText="Description"
                forceValidators={this.props.submitting}
                autoFocus={true}
                name="description"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <ValidatedTextField
                className="basic-form-input"
                value={this.props.basicInfo.searchTerms}
                label={'Search Terms'}
                onValidate={this.onValidate}
                onForcedValidation={this.onForcedValidation}
                forceValidators={this.props.submitting}
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
                className="basic-form-input"
                value={this.props.basicInfo.state}
                label={'State/Province'}
                name='state'
                select
                forceValidators={this.props.submitting}
                onValidate={this.onValidate}
                onForcedValidation={this.onForcedValidation}
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
                className="basic-form-input"
                value={this.props.basicInfo.country}
                label={'Country'}
                name='country'
                select
                forceValidators={this.props.submitting}
                onValidate={this.onValidate}
                onForcedValidation={this.onForcedValidation}
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
                className="basic-form-input"
                value={this.props.basicInfo.sampleAPIKey}
                label={'Sample Api Key'}
                forceValidators={this.props.submitting}
                onValidate={this.onValidate}
                onForcedValidation={this.onForcedValidation}
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
                className="basic-form-input"
                value={this.props.basicInfo.endpoint}
                label={'Endpoint'}
                forceValidators={this.props.submitting}
                onValidate={this.onValidate}
                onForcedValidation={this.onForcedValidation}
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
                className="basic-form-input"
                value={this.props.basicInfo.sampleDataKey}
                forceValidators={this.props.submitting}
                label={'Sample Data Key'}
                name='sampleDataKey'
                onValidate={this.onValidate}
                onForcedValidation={this.onForcedValidation}
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
                className="basic-form-input"
                value={this.props.basicInfo.records}
                forceValidators={this.props.submitting}
                label={'# of records'}
                onValidate={this.onValidate}
                onForcedValidation={this.onForcedValidation}
                name='records'
                type="number"
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
                className="basic-form-input"
                value={this.props.basicInfo.askPriceLow}
                forceValidators={this.props.submitting}
                label={'Ask Price (low)'}
                onValidate={this.onValidate}
                onForcedValidation={this.onForcedValidation}
                name='askPriceLow'
                type="number"
                errors={[
                  {type: ERROR_TYPE.REQUIRED},
                  {type: ERROR_TYPE.MAX, val: this.props.basicInfo.askPriceHigh},
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
                className="basic-form-input"
                value={this.props.basicInfo.askPriceHigh}
                forceValidators={this.props.submitting}
                label={'Ask Price (high)'}
                onValidate={this.onValidate}
                onForcedValidation={this.onForcedValidation}
                name='askPriceHigh'
                type="number"
                errors={[
                  {type: ERROR_TYPE.REQUIRED},
                  {type: ERROR_TYPE.MIN, val: this.props.basicInfo.askPriceLow},
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
