import {COMMON_ACTIONS} from "./commonActions";

interface CommonState {
  topics: any[];
}

const defaultState: CommonState = {
  topics: []
};

const reducer = function(state=defaultState, action: any) {
  let newState = {...state};

  switch(action.type) {
    case COMMON_ACTIONS.SET_TOPICS:
      newState.topics = action.topics;
      break;
    default:
      return state;
  }
  return newState;
};

export default reducer;
