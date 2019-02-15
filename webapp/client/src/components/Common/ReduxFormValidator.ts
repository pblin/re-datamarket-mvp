import {ERROR_TYPE, ErrorType, isURL} from "./ErrorType";

export interface ReduxValidator {
  fieldName: string;
  errors: ErrorType[],
  errorMessages: string[];
}

export class ReduxFormValidator {
  isValid(val: any, errorType: ErrorType) {
    switch (errorType.type) {
      case ERROR_TYPE.REQUIRED:
        return val != '' && val != undefined;
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
        return isURL(val);
      case ERROR_TYPE.PATTERN:
        return errorType.val.test(val)
    }
    return true;
  }

  validate(values: any, reduxValidators: ReduxValidator[]) {
    let errors = {};
    reduxValidators.forEach( (validator: ReduxValidator) => {
      let value = values[validator.fieldName];

      for(let i = 0; i < validator.errors.length; i++) {
        if(!this.isValid(value, validator.errors[i])) {
          errors[validator.fieldName] = validator.errorMessages[i];
          break;
        }
      }
    });
    return errors;
  }
}
