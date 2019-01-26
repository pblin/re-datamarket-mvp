import {FILE_ACTIONS} from './actions';

const defaultState: any = {
  sources: [],
  search: ''
};

const reducer = function(state=defaultState, action: any) {
  let newState = {...state};

  switch(action.type) {
    case FILE_ACTIONS.FILE_UPLOAD_ASYNC:
      console.log('Made it to file upload async');
      console.log(action);
      break;
    default:
      return state;
  }

  return newState;
};

export default reducer;
