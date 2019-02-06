import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {Grid, TextField} from "@material-ui/core";
import "./DatasetWizard.css";

interface BasicFormProps {
  handleSubmit: any;
}

const renderTextField = ({input, label, meta, custom}) => {
  console.log(input);
  console.log(label);
  console.log('custom');
  console.log(custom);
  console.log('error');
  console.log(meta);
  //TODO: add autofocus
  //TODO: HelperText during an error
  let helperText = meta.error && meta.touched ? meta.error: custom.helperText;

  return (
    <Grid item xs={custom.gridXs} sm={custom.gridSm}>
      <TextField
        className="basic-form-input"
        margin="normal"
        variant={'outlined'}
        label={label}
        error={meta.touched && meta.error}
        {...input}
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
              custom={ {helperText: "Description", gridXs: '12', gridSm: '6'} }
            />
          </Grid>
          <button type="submit">Submit</button>
        </form>
      </Grid>
    );
  }
}

export default reduxForm({form: 'contact', validate})(BasicInfoForm);
