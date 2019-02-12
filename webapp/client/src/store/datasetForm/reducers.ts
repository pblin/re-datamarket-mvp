import {WizardStep} from "../../components/DatasetManager/DatasetWizard/WizardStep";
import {DATASET_FORM_ACTIONS} from "./actions";

interface DatasetFormState {
  wizard: {
    steps: WizardStep[],
    currentStep: number
  },
  basicInfo: any,
  schema: any[] //TODO: typecheck
}

const defaultState: DatasetFormState = {
  wizard: {
    steps: [
      {label: 'Dataset Info', completed: false},
      {label: 'Upload Schema', completed: false},
      {label: 'Published', completed: false}
    ],
    currentStep: 0
  },
  basicInfo: [],
  schema: []
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
      break;
    case DATASET_FORM_ACTIONS.UPDATE_BASIC_INFO:
      newState.basicInfo = [...newState.basicInfo];
      newState.basicInfo = action.basicInfo;
      break;
    case DATASET_FORM_ACTIONS.LOAD_SCHEMA_LIST:
      if(action.value) {
        console.log('LOAD SCHEMA LIST');
        console.log(action.value);
        newState.schema = [...action.value];
        console.log(newState.schema);
      }
      break;
    default:
      return state;
  }
  return newState;
};

export default reducer;
