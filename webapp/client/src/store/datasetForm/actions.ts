export enum DATASET_FORM_ACTIONS {
  NEXT_STEP = "NEXT_STEP",
  PREV_STEP = "PREV_STEP",
  GOTO_STEP = "GOTO_STEP",
  LOAD_SCHEMA_LIST = "LOAD_SCHEMA_LIST",
  CHANGE_NO_SCHEMA_ERROR = "CHANGE_NO_SCHEMA_ERROR",
  CHANGE_SCHEMA = "CHANGE_SCHEMA",
  SCHEMA_PUBLISHED = "SCHEMA_PUBLISHED",
  UPDATE_DATASET_FORM = "UPDATE_DATASET_FORM",
  RESET = "RESET"
}

export function nextStep() {
  return {type: DATASET_FORM_ACTIONS.NEXT_STEP}
}

export function prevStep() {
  return {type: DATASET_FORM_ACTIONS.PREV_STEP}
}

export function gotoStep(step: number) {
  return {type: DATASET_FORM_ACTIONS.GOTO_STEP, step}
}

export function changeDisplaySchemaError(displayError: boolean) {
  return {type: DATASET_FORM_ACTIONS.CHANGE_NO_SCHEMA_ERROR, displayError}
}

export function changeSchema(name: string, field: string, value: any) {
  return {type: DATASET_FORM_ACTIONS.CHANGE_SCHEMA, name, field, value};
}

export function updateDatasetForm(dataset: any) {
  return {type: DATASET_FORM_ACTIONS.UPDATE_DATASET_FORM, dataset}
}

export function resetForm() {
  return {type: DATASET_FORM_ACTIONS.RESET};
}
