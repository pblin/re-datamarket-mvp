import {DATASET_INFO_ACTIONS} from "./datasetInfoActions";

interface DatasetInfoState {
  dataset: undefined,
  schema: any[]
}

const defaultState: DatasetInfoState = {
  dataset: undefined,
  schema: []
};

const reducer = function(state=defaultState, action: any) {
  let newState = {...state};

  switch(action.type) {
    case DATASET_INFO_ACTIONS.DATASET_INFO_RETRIEVED:
      newState.schema = JSON.parse(action.dataset['json_schema']);
      break;
    default:
      return state;
  }
  return newState;
};

export default reducer;
