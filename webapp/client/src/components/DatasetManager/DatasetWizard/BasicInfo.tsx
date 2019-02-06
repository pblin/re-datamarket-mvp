import * as React from "react";
import {Grid} from "@material-ui/core";
import {ValidatedTextField} from "../../Common/Validator";
import "./DatasetWizard.css";
import {ERROR_TYPE} from "../../Common/ErrorType";
import Button from "@material-ui/core/Button/Button";

interface BasicInfoProps {
  onFormChange: any;
  basicInfo: any; //TODO: Typecast this
  onSubmit: any;
}

interface BasicInfoState {
  submitting: boolean,
  submitted: boolean
}

export class BasicInfo extends React.Component<BasicInfoProps, BasicInfoState> {
  state: any;
  inputLength: number;
  counter: number = 0;
  validatedInputs: any[] = [];

  constructor(props: BasicInfoProps) {
    super(props);
    this.state = {
      submitted: false,
      submitting: false
    };

    this.onValidate = this.onValidate.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  onValidate(value: any, key: string, isValid: boolean) {
      console.log('On validate');
      console.log(value);
      if(this.state.submitting) {
        this.counter++;
        this.validatedInputs.push(value, key, isValid);
      } else {
        this.props.onFormChange(key, value, isValid);
      }
  }

  componentDidUpdate() {
    if(this.counter == this.inputLength) {
      this.counter = 0;
      this.props.onSubmit(this.validatedInputs, this.isFormValid(this.validatedInputs));
      this.setState({
        submitting: false
      });
      this.validatedInputs = [];
    }
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('will update');
    console.log(this.props);
    console.log(nextProps);
    console.log(nextState)
  }

  validateForm(e) {
    e.preventDefault();
    this.setState({submitting: true});
    console.log('validating form');
  }

  isFormValid(inputs: any[]) {
    return inputs.every((input) => {
      return input.isValid;
    })
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
                errors={[
                  {type: ERROR_TYPE.REQUIRED},
                ]}
                errorMessages={[
                  'Please enter a valid description'
                ]}
                margin="normal"
                variant={'outlined'}
                helperText="Description"
                forceValidators={this.state.submitting}
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
                forceValidators={this.state.submitting}
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
                forceValidators={this.state.submitting}
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
                className="basic-form-input"
                value={this.props.basicInfo.country}
                label={'Country'}
                name='country'
                select
                forceValidators={this.state.submitting}
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
                className="basic-form-input"
                value={this.props.basicInfo.sampleAPIKey}
                label={'Sample Api Key'}
                forceValidators={this.state.submitting}
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
                className="basic-form-input"
                value={this.props.basicInfo.endpoint}
                label={'Endpoint'}
                forceValidators={this.state.submitting}
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
                className="basic-form-input"
                value={this.props.basicInfo.sampleDataKey}
                forceValidators={this.state.submitting}
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
                className="basic-form-input"
                value={this.props.basicInfo.records}
                forceValidators={this.state.submitting}
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
                className="basic-form-input"
                value={this.props.basicInfo.askPriceLow}
                forceValidators={this.state.submitting}
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
                className="basic-form-input"
                value={this.props.basicInfo.askPriceHigh}
                forceValidators={this.state.submitting}
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
            <Button onClick={this.validateForm}>Next</Button>
          </Grid>
        </form>
      </Grid>
    )
  }
}
