import {MARKETPLACE_ACTIONS} from "./marketplaceActions";

interface MarketplaceState {
  schemaFilter: string;
  schemas: any[];
}

const defaultState: MarketplaceState = {
  schemaFilter: 'all',
  schemas: []
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
    default:
      return state;
  }
  return newState;
};

export default reducer;
