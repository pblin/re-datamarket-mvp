export enum DATASET_FORM_ACTIONS {
  NEXT_STEP = "NEXT_STEP",
  PREV_STEP = "PREV_STEP",
  GOTO_STEP = "GOTO_STEP"
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
