import {PROFILE_ACTIONS} from "./profileActions";

interface ProfileState {
  profile: any;
  email: string;
}

const defaultState: ProfileState = {
  profile: undefined,
  email: ''
};

const reducer = function(state=defaultState, action: any) {
  let newState = {...state};

  switch(action.type) {
    case PROFILE_ACTIONS.SET_PROFILE:
      newState.profile = JSON.parse(action.profile);
      newState.email = action.email;
      break;
    default:
      return state;
  }
  return newState;
};

export default reducer;
