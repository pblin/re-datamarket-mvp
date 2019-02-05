import * as React from "react";
import {TextField} from "@material-ui/core";
import {OutlinedTextFieldProps} from "@material-ui/core/TextField";
import {ERROR_TYPE, ErrorType, IsUrl} from "./ErrorType";
import {SelectOption} from "./SelectOption";

interface ValidatedTextFieldProps extends OutlinedTextFieldProps{
  required?: boolean;
  errorText?: string;
  errors : ErrorType[];
  errorMessages: string[];
  onValidate: any; //TODO: Type check this
  options?: SelectOption[];
  name: string;
}

interface ValidatedTextFieldState {}

export class ValidatedTextField extends React.Component<ValidatedTextFieldProps, ValidatedTextFieldState> {
  state: any;
  dirty: boolean = false;
  helperText: string;
  valid: boolean = true;
  error: boolean = false;

  constructor(props: ValidatedTextFieldProps) {
    super(props);
    this.state = {value: ''};
  }

  isValid(val: any, errorType: ErrorType) {
    switch (errorType.type) {
      case ERROR_TYPE.REQUIRED:
        return val != '';
      case ERROR_TYPE.LENGTH:
        return val.length == errorType.val;
      case ERROR_TYPE.MAX:
        return val <= errorType.val;
      case ERROR_TYPE.MIN:
        return val >= errorType.val;
      case ERROR_TYPE.MAX_LENGTH:
        return val.length <= errorType.val;
      case ERROR_TYPE.MIN_LENGTH:
        return val.length >= errorType.val;
      case ERROR_TYPE.GREATER_THAN:
        return val > errorType.val;
      case ERROR_TYPE.LESS_THAN:
        return val < errorType.val;
      case ERROR_TYPE.IS_URL:
        return IsUrl.test(val);
      case ERROR_TYPE.PATTERN:
        return errorType.val.test(val)
    }
    return true;
  }

  generateOptions(props: ValidatedTextFieldProps) {
    if(props.options) {
        return props.options.map(option => {
          return (<option key={option.key} value={option.value}>{option.value}</option>)
        })
    }
  }

  generateProps(props: ValidatedTextFieldProps) {
    let generatedProps: any = {};

    generatedProps.onChange = (event) => {
      if(!this.dirty) {
        this.dirty = !this.dirty;
      } else {
        for(let i = 0; i < props.errors.length; i++) {
          console.log('prop prop ', props.value);
          let isValid = this.isValid(event.target.value, props.errors[i]);
          if(!isValid) {
            this.helperText = props.errorMessages[i];
            this.error = true;
            this.valid = false;
            break;
          }
          if(i == props.errors.length - 1) {
            this.valid = true;
            this.error = false;
          }
        }
      }

      if(props.onValidate) {
        props.onValidate(event, this.props.name, this.valid);
      }
    };

    let newProps = Object.assign({}, props, generatedProps);

    //Props that don't belong on the TextField
    delete newProps.errorText;
    delete newProps.onValidate;
    delete newProps.errors;
    delete newProps.errorMessages;
    return newProps;
  }

  render() {
    return (
      <TextField
        {...this.generateProps(this.props)}
        error={this.error}
        helperText={this.helperText}
      >
        {this.generateOptions(this.props)}
      </TextField>
    )
  }
}
