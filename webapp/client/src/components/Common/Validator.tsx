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
  onForcedValidation?: any;
  options?: SelectOption[];
  forceValidators?: boolean;
  name: string;
}

interface ValidatedTextFieldState {}

export class ValidatedTextField extends React.Component<ValidatedTextFieldProps, ValidatedTextFieldState> {
  state: any;
  dirty: boolean = false;
  helperText: string;
  valid: boolean = true;
  error: boolean = false;
  forced: boolean = false;

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

  checkForErrors(props, val: any) {
    for(let i = 0; i < props.errors.length; i++) {
      let isValid = this.isValid(val, props.errors[i]);
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

  shouldComponentUpdate(nextProps: Readonly<any>, nextState: Readonly<{}>): boolean {
    console.log('Should Update?');
    console.log(nextProps.value);
    console.log(nextState);
    console.log(this.props.value);
    console.log(nextProps.forceValidators || this.props.value != nextProps.value);
    //return nextProps.forceValidators != true;
    return true;
    //return nextProps.forceValidators || this.props.value != nextProps.value;
  }

  generateProps(props: ValidatedTextFieldProps) {
    let generatedProps: any = {};

    console.log('bing bing bing');
    generatedProps.onChange = (event) => {
      if(!this.dirty) {
        this.dirty = !this.dirty;
      } else {
        this.checkForErrors(props, event.target.value)
      }

      if(props.onValidate) {
        props.onValidate(event.target.value, this.props.name, this.valid);
      }
    };

    if(props.forceValidators && !this.forced) {
      console.log('Run ten times');
      this.checkForErrors(props, this.props.value);
      this.forced = !this.forced;
      if(props.onValidate) {
        props.onValidate(this.props.value, this.props.name, this.valid);
      }
    }

    let newProps = Object.assign({}, props, generatedProps);

    //Props that don't belong on the TextField
    delete newProps.errorText;
    delete newProps.onValidate;
    delete newProps.onForcedValidation;
    delete newProps.errors;
    delete newProps.errorMessages;
    delete newProps.forceValidators;
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
