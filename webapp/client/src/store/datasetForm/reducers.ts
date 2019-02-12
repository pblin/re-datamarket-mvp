import {WizardStep} from "../../components/DatasetManager/DatasetWizard/WizardStep";
import {DATASET_FORM_ACTIONS} from "./actions";

interface DatasetFormState {
  wizard: {
    steps: WizardStep[],
    currentStep: number
  },
  schema: any[] //TODO: typecheck
  displayNoSchemaError: boolean;
}

const defaultState: DatasetFormState = {
  wizard: {
    steps: [
      {label: 'Dataset Info', completed: false},
      {label: 'Upload Schema', completed: false},
      {label: 'Published', completed: false, nextButtonValue: 'Publish'}
    ],
    currentStep: 0
  },
  schema: [],
  displayNoSchemaError: false
};

const reducer = function(state=defaultState, action: any) {
  let newState = {...state};

  switch(action.type) {
    case DATASET_FORM_ACTIONS.NEXT_STEP:
      newState.wizard.currentStep = state.wizard.currentStep == state.wizard.steps.length - 1 ?
        state.wizard.steps.length - 1:
        state.wizard.currentStep + 1;
      break;
    case DATASET_FORM_ACTIONS.PREV_STEP:
      newState.wizard.currentStep = state.wizard.currentStep == 0?
        0:
        state.wizard.currentStep - 1;
      break;
    case DATASET_FORM_ACTIONS.GOTO_STEP:
      newState.wizard.currentStep = action.step;
      break;
    case DATASET_FORM_ACTIONS.CHANGE_NO_SCHEMA_ERROR:
      newState.displayNoSchemaError = action.displayError;
      break;
    case DATASET_FORM_ACTIONS.LOAD_SCHEMA_LIST:
      if(action.value) {
        newState.displayNoSchemaError = false;
        newState.schema = [...action.value];
      }
      break;
    default:
      return state;
  }
  return newState;
};

export default reducer;