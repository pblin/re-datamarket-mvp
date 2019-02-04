import * as React from "react";
import {TextField} from "@material-ui/core";
import {OutlinedTextFieldProps} from "@material-ui/core/TextField";
import {ERROR_TYPE, ErrorType} from "./ErrorType";

interface ValidatedTextFieldProps extends OutlinedTextFieldProps{
  required?: boolean;
  errorText?: string;
  errors : ErrorType[];
  errorMessages: string[];
  onValidate: any; //TODO: Type check this
}

interface ValidatedTextFieldState {}

export class ValidatedTextField extends React.Component<ValidatedTextFieldProps, ValidatedTextFieldState> {
  state: any;
  dirty: boolean = false;
  valid: boolean = true;

  constructor(props: ValidatedTextFieldProps) {
    super(props);
    this.state = {value: ''};
  }

  isValid(val: any, errorType: ErrorType) {
    console.log('Validity Check');

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
      case ERROR_TYPE.PATTERN:
        return errorType.val.test(val)
    }
    return true;
  }

  generateProps(props: ValidatedTextFieldProps) {
    let generatedProps: any = {};

    //TODO: Make different error checks [min, max, required, pattern]
    if(props.required && !props.value && this.dirty) {
      generatedProps.error = true;
      if(props.errorText) {
        //generatedProps.helperText = props.errorText;
      }
    }

    //Only validate the field if its dirty
    if(this.dirty) {
      for(let i = 0; i < props.errors.length; i++) {
        let isValid = this.isValid(props.value, props.errors[i]);
        console.log(isValid);
        if(!isValid) {
          generatedProps.helperText = props.errorMessages[i];
          generatedProps.error = true;
          break;
        }
      }
    }


    generatedProps.onChange = (event) => {
      if(!this.dirty) {
        this.dirty = !this.dirty;
      }
      if(props.onChange) {
        props.onChange(event);
      }
      if(props.onValidate) {
        props.onValidate();
      }
      console.log('Is dirty');
      console.log(this.dirty);
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
      >
      </TextField>
    )
  }
}
