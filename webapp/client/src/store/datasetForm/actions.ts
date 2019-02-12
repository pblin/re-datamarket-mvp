export enum DATASET_FORM_ACTIONS {
  NEXT_STEP = "NEXT_STEP",
  PREV_STEP = "PREV_STEP",
  GOTO_STEP = "GOTO_STEP",
  LOAD_SCHEMA_LIST = "LOAD_SCHEMA_LIST",
  CHANGE_NO_SCHEMA_ERROR = "CHANGE_NO_SCHEMA_ERROR"
}

export function nextStep() {
  return {type: DATASET_FORM_ACTIONS.NEXT_STEP}
}

export function prevStep() {
  return {type: DATASET_FORM_ACTIONS.PREV_STEP}
}

export function changeDisplaySchemaError(displayError: boolean) {
  return {type: DATASET_FORM_ACTIONS.CHANGE_NO_SCHEMA_ERROR, displayError}
}
