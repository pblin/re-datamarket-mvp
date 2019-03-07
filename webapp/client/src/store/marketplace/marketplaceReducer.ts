import {MARKETPLACE_ACTIONS} from "./marketplaceActions";
import {DATASET_FORM_ACTIONS} from "../datasetForm/actions";

interface MarketplaceState {
  schemaFilter: string;
  schemas: any[];
  userSchemas: any[];
  datasetDialog: any;
  confirmDeleteDialog: any;
  search: string;
}

const defaultState: MarketplaceState = {
  schemaFilter: 'all',
  schemas: [],
  userSchemas: [],
  datasetDialog: {
    open: false,
    mode: 'add',
    dataset: undefined
  },
  confirmDeleteDialog: {
    open: false,
    dataset: {
      name: ''
    }
  },
  search: ''
};

const reducer = function(state=defaultState, action: any) {
  let newState = {...state};

  switch(action.type) {
    case MARKETPLACE_ACTIONS.CHANGE_SCHEMA_FILTER:
      newState.schemaFilter = action.schemaFilter;
      break;
    case MARKETPLACE_ACTIONS.SCHEMAS_RETRIEVED:
      newState.schemas = action.schemas;
      break;
    case MARKETPLACE_ACTIONS.USER_SCHEMAS_RETRIEVED:
      newState.userSchemas = action.schemas;
      break;
    case MARKETPLACE_ACTIONS.CHANGE_DIALOG_STATE:
      newState.datasetDialog = {...state.datasetDialog};
      newState.datasetDialog.open = action.isOpen;
      newState.datasetDialog.dataset = action.dataset;
      newState.datasetDialog.mode = action.mode;
      break;
    case MARKETPLACE_ACTIONS.CHANGE_CONFIRM_DIALOG_STATE:
      newState.confirmDeleteDialog = {...state.confirmDeleteDialog};
      newState.confirmDeleteDialog.open = action.isOpen;
      newState.confirmDeleteDialog.dataset = action.dataset;
      break;
    case MARKETPLACE_ACTIONS.DATASET_DELETED:
      newState.schemas = [...newState.schemas.filter(schema => schema.id != action.datasetId)];
      newState.userSchemas = [...newState.userSchemas.filter(schema => schema.id != action.datasetId)];
      break;
    case MARKETPLACE_ACTIONS.CHANGE_SEARCH:
      newState.search = action.search;
      break;
    case MARKETPLACE_ACTIONS.DATASETS_SEARCHED:
      newState.schemas = [...state.schemas];
      newState.schemas = action.datasets;
      break;
    case DATASET_FORM_ACTIONS.DATASET_PUBLISHED:
      console.log('THE DATASET WAS PUBLISHED');
      newState.schemas = [action.dataset, ...state.schemas];
      break;
    case DATASET_FORM_ACTIONS.DATASET_REPUBLISHED:
      console.log('THE DATASET WAS REPUBLISHED');
      newState.userSchemas = [action.dataset, ...state.userSchemas.filter(dataset => dataset.id != action.dataset.id)];
      break;
    default:
      return state;
  }
  return newState;
};

export default reducer;
