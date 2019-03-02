import {WizardStep} from "../../components/DatasetManager/DatasetWizard/WizardStep";
import {DATASET_FORM_ACTIONS} from "./actions";

interface DatasetFormState {
  wizard: {
    steps: WizardStep[],
    currentStep: number
  },
  schema: any[] //TODO: typecheck
  displayNoSchemaError: boolean;
  schemaPublished: boolean;
  schemaPublishedId: string;
}

const defaultState: DatasetFormState = {
  wizard: {
    steps: [
      {label: 'Dataset Info', completed: false},
      {label: 'Upload Schema', completed: false},
      {label: 'Review', completed: false},
      {label: 'Publish', completed: false, nextButtonValue: 'Publish'}
    ],
    currentStep: 0
  },
  schema: [],
  displayNoSchemaError: false,
  schemaPublished: false,
  schemaPublishedId: undefined
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
    case DATASET_FORM_ACTIONS.CHANGE_SCHEMA:
      let index = newState.schema.findIndex(sch => sch.name == action.name);
      let found = newState.schema.find(sch => sch.name == action.name);
      found[action.field] = action.value;
      newState.schema = [...newState.schema.filter(sch => sch.name != action.name)];
      newState.schema.splice(index, 0, found);
      break;
    case DATASET_FORM_ACTIONS.SCHEMA_PUBLISHED:
      newState.schemaPublishedId = action.schemaId;
      newState.schemaPublished = true;
      break;
    case DATASET_FORM_ACTIONS.LOAD_SCHEMA_LIST:
      if(action.value) {
        newState.displayNoSchemaError = false;
        newState.schema = [...action.value];
      }
      break;
    case DATASET_FORM_ACTIONS.UPDATE_DATASET_FORM:
      //TODO: Update schema here
      newState.schema = JSON.parse(action.dataset['json_schema']);
      break;
    case DATASET_FORM_ACTIONS.RESET:
      newState.schema = [];
      newState.wizard.currentStep = 0;
      newState.schemaPublished = false;
      newState.schemaPublishedId = undefined;
      break;
    default:
      return state;
  }
  return newState;
};

export default reducer;
