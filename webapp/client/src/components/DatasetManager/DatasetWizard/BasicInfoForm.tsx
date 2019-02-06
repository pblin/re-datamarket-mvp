import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {Grid, TextField} from "@material-ui/core";
import "./DatasetWizard.css";

interface BasicFormProps {
  handleSubmit: any;
}

const renderSelectField = ({input, label, meta, custom}) => {
  let helperText = meta.error && meta.touched ? meta.error: custom.helperText;

  return (
    <Grid item xs={custom.gridXs} sm={custom.gridSm}>
      <TextField
        className="basic-form-input"
        margin="normal"
        variant={'outlined'}
        label={label}
        select
        error={meta.dirty && meta.error}
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
  let helperText = meta.error && meta.touched ? meta.error: custom.helperText;
  console.log(input);
  return (
    <Grid item xs={custom.gridXs} sm={custom.gridSm}>
      <TextField
        className="basic-form-input"
        margin="normal"
        variant={'outlined'}
        label={label}
        error={meta.dirty && meta.error}
        {...input}
        type={custom.type || 'text'}
        fullWidth
        helperText={helperText}
      />
    </Grid>
  )
};

const validate = (values) => {
  let errors: any = {};
  console.log('Validating');
  console.log(values);
  if(!values.description) {
    errors.description = 'A description is required';
  }

  console.log(errors);
  return errors;
};

class BasicInfoForm extends Component<BasicFormProps> {
  render() {
    return (
      <Grid container={true} justify="center">
        <form className="basic-form" onSubmit={this.props.handleSubmit}>
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
              label="State"
              component={renderSelectField}
              name="state"
              custom={ {helperText: "State", gridXs: 12, gridSm: 2, options: ['New York']} }
            />
            <Field
              label="Country"
              component={renderSelectField}
              name="country"
              custom={ {helperText: "Country", gridXs: 12, gridSm: 2, options: ['Country']} }
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
          <button type="submit">Submit</button>
        </form>
      </Grid>
    );
  }
}

export default reduxForm({form: 'contact', validate})(BasicInfoForm);
