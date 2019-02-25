import {MARKETPLACE_ACTIONS} from "./marketplaceActions";

interface MarketplaceState {
  schemaFilter: string
}

const defaultState: MarketplaceState = {
  schemaFilter: 'all',
};

const reducer = function(state=defaultState, action: any) {
  let newState = {...state};

  switch(action.type) {
    case MARKETPLACE_ACTIONS.CHANGE_SCHEMA_FILTER:
      console.log('REDUCE');
      console.log(action);
      newState.schemaFilter = action.schemaFilter;
      break;
    case MARKETPLACE_ACTIONS.SCHEMAS_RETRIEVED:
      console.log('SCHEMAS RETRIEVED');
      console.log(action);
      break;
    default:
      return state;
  }
  return newState;
};

export default reducer;
