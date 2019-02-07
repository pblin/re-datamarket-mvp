import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Grid, TextField} from "@material-ui/core";
import {ReduxFormValidator} from "../../Common/ReduxFormValidator";
import "./DatasetWizard.css";
import {ERROR_TYPE} from "../../Common/ErrorType";

interface BasicFormProps {
  handleSubmit: any;
  pristine: boolean;
  invalid: boolean;
}

const renderSelectField = ({input, label, meta, custom}) => {
  let helperText = meta.error != undefined && meta.touched ? meta.error: custom.helperText;

  return (
    <Grid item xs={custom.gridXs} sm={custom.gridSm}>
      <TextField
        className="basic-form-input"
        margin="normal"
        variant={'outlined'}
        label={label}
        select
        error={meta.touched && meta.error != undefined}
        {...input}
        fullWidth
        helperText={helperText}
      >
        {custom.options.map(option => {
          return (<option key={option} value={option}>{option}</option>)
        })}
      </TextField>
    </Grid>
  )
};

const renderTextField = ({input, label, meta, custom}) => {
  let helperText = meta.error != undefined && meta.touched ? meta.error: custom.helperText;

  return (
    <Grid item xs={custom.gridXs} sm={custom.gridSm}>
      <TextField
        className="basic-form-input"
        margin="normal"
        variant={'outlined'}
        label={label}
        error={meta.touched && meta.error != undefined}
        {...input}
        type={custom.type || 'text'}
        fullWidth
        helperText={helperText}
      />
    </Grid>
  )
};

const reduxFormValidator = new ReduxFormValidator();

const validate = (values) => {
  let errors = reduxFormValidator.validate(values, [
    {
      fieldName: 'description',
      errors: [
        {type: ERROR_TYPE.REQUIRED}
      ],
      errorMessages: [
        'Description is required'
      ]
    },
    {
      fieldName: 'searchTerms',
      errors: [
        {type: ERROR_TYPE.REQUIRED}
      ],
      errorMessages: [
        'Error Message is required'
      ]
    },
    {
      fieldName: 'state',
      errors: [
        {type: ERROR_TYPE.REQUIRED}
      ],
      errorMessages: [
        'Please select a state/province'
      ]
    },
    {
      fieldName: 'sampleAPIKey',
      errors: [
        {type: ERROR_TYPE.REQUIRED}
      ],
      errorMessages: [
        'Please provide a sample api key'
      ]
    },
    {
      fieldName: 'sampleDataKey',
      errors: [
        {type: ERROR_TYPE.REQUIRED}
      ],
      errorMessages: [
        'Please provide a sample data key'
      ]
    },
    {
      fieldName: 'country',
      errors: [
        {type: ERROR_TYPE.REQUIRED}
      ],
      errorMessages: [
        'Please select a country'
      ]
    },
    {
      fieldName: 'endpoint',
      errors: [
        {type: ERROR_TYPE.REQUIRED}
      ],
      errorMessages: [
        'Endpoint is required',
        'Please enter a valid endpoint'
      ]
    },
    {
      fieldName: 'records',
      errors: [
        {type: ERROR_TYPE.REQUIRED},
        {type: ERROR_TYPE.GREATER_THAN, val: 0}
      ],
      errorMessages: [
        'Records are required',
        'Please ensure that the number of records are greater than 0'
      ]
    },
    {
      fieldName: 'askPriceLow',
      errors:[
        {type: ERROR_TYPE.REQUIRED},
        {type: ERROR_TYPE.LESS_THAN, val: values.askPriceHigh},
        {type: ERROR_TYPE.MIN, val: 0}
      ],
      errorMessages: [
        'Please enter a valid ask price',
        'Please ensure that the low ask price is not greater than the high ask price',
        'Please enter a positive asking price'
      ]
    },
    {
      fieldName: 'askPriceHigh',
      errors:[
        {type: ERROR_TYPE.REQUIRED},
        {type: ERROR_TYPE.GREATER_THAN, val: values.askPriceLow},
        {type: ERROR_TYPE.MIN, val: 0}
      ],
      errorMessages: [
        'Please enter a valid ask price',
        'Please ensure that the high ask price is not less than the low ask price',
        'Please enter a positive asking price'
      ]
    }
  ]);

  return errors;
};

class BasicInfoForm extends Component<BasicFormProps> {
  render() {
    return (
        <form onSubmit={this.props.handleSubmit}>
          <Grid spacing={24} container={true} >
            <Field
              label="Description"
              component={renderTextField}
              name="description"
              type="text"
              custom={ {helperText: "Description", gridXs: 12, gridSm: 5} }
            />
            <Field
              label="Search Terms"
              component={renderTextField}
              name="searchTerms"
              type="text"
              custom={ {helperText: "Search Terms", gridXs: 12, gridSm: 3} }
            />
            <Field
              label="Country"
              component={renderSelectField}
              name="country"
              custom={ {helperText: "Country", gridXs: 12, gridSm: 2, options: ['USA']} }
            />
            <Field
              label="State"
              component={renderSelectField}
              name="state"
              custom={ {helperText: "State", gridXs: 12, gridSm: 2, options: ['New York']} }
            />
            <Field
              label="Sample Api Key"
              component={renderTextField}
              name="sampleAPIKey"
              type="text"
              custom={ {helperText: "sampleAPIKey", gridXs: 12, gridSm: 6} }
            />
            <Field
              label="Endpoint"
              component={renderTextField}
              name="endpoint"
              type="text"
              custom={ {helperText: "endpoint", gridXs: 12, gridSm: 6} }
            />
            <Field
              label="Sample Data Key"
              component={renderTextField}
              name="sampleDataKey"
              type="text"
              custom={ {helperText: "sampleDataKey", gridXs: 12, gridSm: 6} }
            />
            <Field
              label="# of records"
              component={renderTextField}
              name="records"
              type="number"
              custom={ {helperText: "records", gridXs: 12, gridSm: 2, type: 'number'} }
            />
            <Field
              label="Ask Price (Low)"
              component={renderTextField}
              name="askPriceLow"
              type="number"
              custom={ {helperText: "Ask Price (Low)", gridXs: 12, gridSm: 2, type: 'number'} }
            />
            <Field
              label="Ask Price (High)"
              component={renderTextField}
              name="askPriceHigh"
              type="number"
              custom={ {helperText: "Ask Price (High)", gridXs: 12, gridSm: 2, type: 'number'} }
            />
          </Grid>
        </form>
    );
  }
}

export default reduxForm({form: 'contact', validate, destroyOnUnmount: false})(BasicInfoForm);
