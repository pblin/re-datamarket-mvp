import {FILE_ACTIONS} from './actions';

const defaultState: any = {
};

const reducer = function(state=defaultState, action: any) {
  let newState = Object.assign({}, state);

  switch(action.type) {
    case FILE_ACTIONS.FILE_UPLOAD_ASYNC:
       newState[action.name] = action.value;
       break;
    default:
      return state;
  }

  return newState;
};

export default reducer;
