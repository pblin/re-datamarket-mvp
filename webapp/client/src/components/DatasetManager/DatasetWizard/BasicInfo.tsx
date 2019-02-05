import * as React from "react";
import {Grid} from "@material-ui/core";
import {ValidatedTextField} from "../../Common/Validator";
import "./DatasetWizard.css";
import {ERROR_TYPE} from "../../Common/ErrorType";

interface BasicInfoProps {
  onFormChange: any;
  basicInfo: any; //TODO: Typecast this
  submitted: boolean;
}

interface BasicInfoState {}

export class BasicInfo extends React.Component<BasicInfoProps, BasicInfoState> {
  state: any;

  constructor(props: BasicInfoProps) {
    super(props);
    this.onValidate = this.onValidate.bind(this);
  }

  onValidate(value: any, key: string, isValid: boolean) {
    this.props.onFormChange(key, value, isValid);
  }

  render() {
    return (
      <Grid container={true} justify="center">
        <form className="basic-form" id="basic-info">
          <Grid spacing={24} container={true} >
            <Grid item xs={12} sm={5}>
              <ValidatedTextField
                ref="description"
                value={this.props.basicInfo.description}
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
                forceValidators={this.props.submitted}
                autoFocus={true}
                name="description"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <ValidatedTextField
                value={this.props.basicInfo.searchTerms}
                label={'Search Terms'}
                onValidate={this.onValidate}
                forceValidators={this.props.submitted}
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
                value={this.props.basicInfo.state}
                label={'State/Province'}
                name='state'
                select
                forceValidators={this.props.submitted}
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
                value={this.props.basicInfo.country}
                label={'Country'}
                name='country'
                select
                forceValidators={this.props.submitted}
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
                value={this.props.basicInfo.sampleAPIKey}
                label={'Sample Api Key'}
                forceValidators={this.props.submitted}
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
                value={this.props.basicInfo.endpoint}
                label={'Endpoint'}
                forceValidators={this.props.submitted}
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
                value={this.props.basicInfo.sampleDataKey}
                forceValidators={this.props.submitted}
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
                value={this.props.basicInfo.records}
                forceValidators={this.props.submitted}
                label={'# of records'}
                onValidate={this.onValidate}
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
                value={this.props.basicInfo.askPriceLow}
                forceValidators={this.props.submitted}
                label={'Ask Price (low)'}
                onValidate={this.onValidate}
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
                value={this.props.basicInfo.askPriceHigh}
                forceValidators={this.props.submitted}
                label={'Ask Price (high)'}
                onValidate={this.onValidate}
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
