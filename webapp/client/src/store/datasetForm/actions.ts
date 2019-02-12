export enum DATASET_FORM_ACTIONS {
  NEXT_STEP = "NEXT_STEP",
  PREV_STEP = "PREV_STEP",
  GOTO_STEP = "GOTO_STEP",
  DATASET_FILE_CHANGE = "DATASET_FILE_CHANGE",
  UPDATE_BASIC_INFO = "UPDATE_BASIC_INFO",
  LOAD_SCHEMA_LIST = "LOAD_SCHEMA_LIST"
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

export function updateBasicInfo(basicInfo: any) {
  return {type: DATASET_FORM_ACTIONS.UPDATE_BASIC_INFO, basicInfo}
}


