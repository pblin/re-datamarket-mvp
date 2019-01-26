import {FILE_ACTIONS} from './actions';

const defaultState: any = {
  files: {},
  datasetFormFile: undefined
};

const reducer = function(state=defaultState, action: any) {
  let newState = {...state};

  switch(action.type) {
    case FILE_ACTIONS.FILE_UPLOAD_ASYNC:
      newState.files[action.name] = action.value;
      break;
    case FILE_ACTIONS.DATASET_FILE_CHANGE:
      newState.datasetFormFile = action.file;
      break;
    default:
      return state;
  }

  return newState;
};

export default reducer;
