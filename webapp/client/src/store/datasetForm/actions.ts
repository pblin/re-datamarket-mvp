export enum DATASET_FORM_ACTIONS {
  NEXT_STEP = "NEXT_STEP",
  PREV_STEP = "PREV_STEP",
  GOTO_STEP = "GOTO_STEP",
  DATASET_FILE_CHANGE = "DATASET_FILE_CHANGE",
  UPDATE_BASIC_INFO = "UPDATE_BASIC_INFO"
}

export function nextStep() {
  return {type: DATASET_FORM_ACTIONS.NEXT_STEP}
}

export function prevStep() {
  return {type: DATASET_FORM_ACTIONS.PREV_STEP}
}

export function updateBasicInfo(key: string, val: any, isValid: boolean) {
  return {type: DATASET_FORM_ACTIONS.UPDATE_BASIC_INFO, key, val, isValid}
}

export function gotoStep(step: number) {
  return {type: DATASET_FORM_ACTIONS.GOTO_STEP, step}
}

export function datasetFileChange(file: File) {
  return {type: DATASET_FORM_ACTIONS.DATASET_FILE_CHANGE, file: file}
}

