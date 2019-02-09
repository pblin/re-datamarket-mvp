export enum DATASET_FORM_ACTIONS {
  NEXT_STEP = "NEXT_STEP",
  PREV_STEP = "PREV_STEP",
  GOTO_STEP = "GOTO_STEP",
  DATASET_FILE_CHANGE = "DATASET_FILE_CHANGE"
}

export function nextStep() {
  return {type: DATASET_FORM_ACTIONS.NEXT_STEP}
}

export function prevStep() {
  return {type: DATASET_FORM_ACTIONS.PREV_STEP}
}

export function datasetFileChange(file: File) {
  return {type: DATASET_FORM_ACTIONS.DATASET_FILE_CHANGE, file: file}
}


