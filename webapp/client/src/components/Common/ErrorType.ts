export enum ERROR_TYPE {
  REQUIRED = 'REQUIRED',
  PATTERN = 'PATTERN',
  MIN = 'MIN',
  MAX_LENGTH = 'MAX_LENGTH',
  MIN_LENGTH = 'MIN_LENGTH',
  MAX = 'MAX',
  LENGTH = 'LENGTH',
  GREATER_THAN = 'GREATER_THAN',
  LESS_THAN = 'LESS_THAN'
}

export interface ErrorType {
  type: ERROR_TYPE;
  val?: number | string | any;
}
