export enum ERROR_TYPE {
  REQUIRED = 'REQUIRED',
  PATTERN = 'PATTERN',
  MIN = 'MIN',
  MAX_LENGTH = 'MAX_LENGTH',
  MIN_LENGTH = 'MIN_LENGTH',
  MAX = 'MAX',
  LENGTH = 'LENGTH',
  GREATER_THAN = 'GREATER_THAN',
  LESS_THAN = 'LESS_THAN',
  IS_URL='IS_URL'
}

export interface ErrorType {
  type: ERROR_TYPE;
  val?: number | string | any;
}

export const IsUrl = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
