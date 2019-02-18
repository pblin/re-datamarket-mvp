import {PROFILE_ACTIONS} from "./profileActions";

interface ProfileState {
  profile: any;
}

const defaultState: ProfileState = {
  profile: {}
};

const reducer = function(state=defaultState, action: any) {
  let newState = {...state};

  switch(action.type) {
    case PROFILE_ACTIONS.SET_PROFILE:
      console.log('SETTING PROFILE IN REDUCER');
      break;
    default:
      return state;
  }
  return newState;
};

export default reducer;
