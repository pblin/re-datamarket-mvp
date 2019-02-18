import {PROFILE_ACTIONS} from "./profileActions";

interface ProfileState {
  profile: any;
}

const defaultState: ProfileState = {
  profile: undefined
};

const reducer = function(state=defaultState, action: any) {
  let newState = {...state};

  switch(action.type) {
    case PROFILE_ACTIONS.SET_PROFILE:
      newState.profile = JSON.parse(action.profile);
      break;
    default:
      return state;
  }
  return newState;
};

export default reducer;
