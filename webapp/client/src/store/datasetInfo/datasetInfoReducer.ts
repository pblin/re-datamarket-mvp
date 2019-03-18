import {DATASET_INFO_ACTIONS} from "./datasetInfoActions";

interface DatasetInfoState {
  dataset: any,
  schema: any[],
  moreOptionsOpened: boolean
}

const defaultState: DatasetInfoState = {
  dataset: {},
  schema: [],
  moreOptionsOpened: false
};

const reducer = function(state=defaultState, action: any) {
  let newState = {...state};

  switch(action.type) {
    case DATASET_INFO_ACTIONS.DATASET_INFO_RETRIEVED:
      newState.dataset = action.dataset;
      newState.schema = JSON.parse(action.dataset['json_schema']);
      break;
    case DATASET_INFO_ACTIONS.CHANGE_MORE_OPTION_MENU:
      newState.moreOptionsOpened = action.isOpen;
      break;
    default:
      return state;
  }
  return newState;
};

export default reducer;
