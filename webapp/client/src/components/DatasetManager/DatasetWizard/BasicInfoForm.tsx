import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Grid, MenuItem, TextField} from "@material-ui/core";
import {connect} from "react-redux";
import {ReduxFormValidator} from "../../Common/Error/ReduxFormValidator";
import "./DatasetWizard.css";
import {ERROR_TYPE} from "../../Common/Error/ErrorType";
import {datasetDialogSelector} from "../../../store/marketplace/marketplaceSelectors";

interface BasicFormProps {
  handleSubmit: any;
  pristine: boolean;
  invalid: boolean;
}
/* Redo search terms with https://material-ui.com/demos/autocomplete/ */
/* https://stackoverflow.com/questions/23618744/rendering-comma-separated-list-of-links */
const renderSelectField = ({input, label, meta, custom}) => {
  let helperText = meta.error != undefined && meta.touched ? meta.error: custom.helperText;

  return (
    <Grid item xs={custom.gridXs} sm={custom.gridSm}>
      <TextField
        className="basic-form-input"
        margin="normal"
        variant={'standard'}
        label={label}
        select
        error={meta.touched && meta.error != undefined}
        {...input}
        fullWidth
        helperText={helperText}
      >
        {custom.options.map(option => {
          return (<MenuItem key={option} value={option}>{option}</MenuItem>)
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
        variant={'standard'}
        placeholder={custom.placeholder}
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
      fieldName: 'name',
      errors: [
        {type: ERROR_TYPE.REQUIRED}
      ],
      errorMessages: [
        'Name is required'
      ]
    },
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
        {type: ERROR_TYPE.REQUIRED},
        {type: ERROR_TYPE.IS_URL}
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
  componentDidUpdate(prevProps: Readonly<BasicFormProps>, prevState: Readonly<{}>, snapshot?: any): void {
    //@ts-ignore
    //this.props.initialize({name: 'test'})
  }

  render() {
    return (
        <form onSubmit={this.props.handleSubmit}>
          <Grid spacing={24} container={true} >
            <Field
              label="Name"
              component={renderTextField}
              name="name"
              type="text"
              custom={ {gridXs: 12, gridSm: 6, placeholder: "Name of the dataset"} }
            />
            <Field
              label="Description"
              component={renderTextField}
              name="description"
              type="text"
              custom={ {gridXs: 12, gridSm: 6, placeholder: "Description about the dataset"} }
            />
            <Field
              label="Search Terms"
              component={renderTextField}
              name="searchTerms"
              type="text"
              custom={ {gridXs: 12, gridSm: 4, placeholder: "Term1,Term2,Term3"} }
            />
            <Field
              label="Country"
              component={renderSelectField}
              name="country"
              custom={ {gridXs: 12, gridSm: 4, options: ['USA']} }
            />
            <Field
              label="State"
              component={renderSelectField}
              name="state"
              custom={ {gridXs: 12, gridSm: 4, options: ['New York']} }
            />
            <Field
              label="Sample Api Key"
              component={renderTextField}
              name="sampleAPIKey"
              type="text"
              custom={ {gridXs: 12, gridSm: 6, placeholder: "Provide a sample API key"} }
            />
            <Field
              label="Sample Data Key"
              component={renderTextField}
              name="sampleDataKey"
              type="text"
              custom={ {gridXs: 12, gridSm: 6, placeholder: "Provide a sample access data key"} }
            />
            <Field
              label="Endpoint"
              component={renderTextField}
              name="endpoint"
              type="text"
              custom={ {gridXs: 12, gridSm: 12, placeholder: "http://{DATASET ENDPOINT}"} }
            />
            <Field
              label="# of records"
              component={renderTextField}
              name="records"
              type="number"
              custom={ {gridXs: 12, gridSm: 4, type: 'number', placeholder: "Total Amount Of Records"} }
            />
            <Field
              label="Ask Price (Low)"
              component={renderTextField}
              name="askPriceLow"
              type="number"
              custom={ {gridXs: 12, gridSm: 4, type: 'number', placeholder: "Lowest Asking Price"} }
            />
            <Field
              label="Ask Price (High)"
              component={renderTextField}
              name="askPriceHigh"
              type="number"
              custom={ {gridXs: 12, gridSm: 4, type: 'number', placeholder: "Highest Asking Price"} }
            />
          </Grid>
        </form>
    );
  }
}

function mapStateToProps(state, props) {
    const dialog = datasetDialogSelector(state);

    if(!dialog.dataset) {
      return {}
    }
    return {
      initialValues: {
        name: dialog.dataset.name,
        description: dialog.dataset.description,
        searchTerms: dialog.dataset['search_terms'],
        country: dialog.dataset.country,
        state: dialog.dataset['state_province'],
        sampleAPIKey: dialog.dataset['api_key'],
        sampleDataKey: dialog.dataset['enc_data_key'],
        endpoint: dialog.dataset['access_url'],
        records: dialog.dataset['num_of_records'],
        askPriceHigh: dialog.dataset['price_high'],
        askPriceLow: dialog.dataset['price_low']
      }
    };
}

//@ts-ignore
BasicInfoForm = reduxForm({
  form: 'contact',
  validate,
  destroyOnUnmount: false,
  enableReinitialize: false,
})(BasicInfoForm);

export default connect(mapStateToProps)(BasicInfoForm);

