import {MARKETPLACE_ACTIONS} from "./marketplaceActions";

interface MarketplaceState {
  schemaFilter: string;
  schemas: any[];
  userSchemas: any[];
  datasetDialog: any;
  confirmDeleteDialog: any;
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
    dataset: undefined
  }
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
    default:
      return state;
  }
  return newState;
};

export default reducer;
