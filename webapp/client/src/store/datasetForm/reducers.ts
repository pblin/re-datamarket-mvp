import {WizardStep} from "../../components/DatasetManager/DatasetWizard/WizardStep";
import {DATASET_FORM_ACTIONS} from "./actions";

interface DatasetFormState {
  wizard: {
    steps: WizardStep[],
    currentStep: number
  },
  datasetFormFile: any,
  basicInfo: any
}

const defaultState: DatasetFormState = {
    wizard: {
      steps: [
        {label: 'Dataset Info', completed: false},
        {label: 'Upload Schema', completed: false},
        {label: 'Validate Schema', completed: false},
        {label: 'Published', completed: false}
      ],
      currentStep: 0
    },
  datasetFormFile: null,
  basicInfo: {
    description: '',
    searchTerms: '',
    country: '',
    state: 'New York',
    sampleAPIKey: '',
    endpoint: '',
    sampleDataKey: '',
    records: undefined,
    askPriceHigh: undefined,
    askPriceLow: undefined,
    test: '',
    errors: []
  }
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
    case DATASET_FORM_ACTIONS.DATASET_FILE_CHANGE:
      newState.datasetFormFile = action.file;
      break;
    case DATASET_FORM_ACTIONS.UPDATE_BASIC_INFO:
      console.log('Updating Basic Info reducer called');
      console.log(action);
      if(action.isValid && newState.basicInfo.errors.length) {
        newState.basicInfo.errors = [...newState.basicInfo.errors.filter(error => error != action.key)]
      } else if(!action.isValid && !newState.basicInfo.errors[action.key]) {
        newState.basicInfo.errors = [...newState.basicInfo.errors , action.key]
      }
      break;
    default:
      return state;
  }

  console.log(newState);
  return newState;
};

export default reducer;
