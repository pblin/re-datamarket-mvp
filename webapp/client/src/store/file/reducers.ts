import {FILE_ACTIONS} from './actions';

const defaultState: any = {
  files: []
};

const reducer = function(state=defaultState, action: any) {
  let newState = Object.assign({}, state);

  switch(action.type) {
    case FILE_ACTIONS.FILE_UPLOAD_ASYNC:
       let f = newState.files.find(file => action.id == file.fileId);
       f = {...f,  content: action.value};
       newState.files = [...newState.files.filter(file => file.fileId != action.id), f];
       break;
    case FILE_ACTIONS.FILE_CHANGE:
       let file = {blob: action.file, fileId: action.fileId};
       newState.files = [...newState.files.filter(file => file.fileId != action.fileId), file];
       break;
    case FILE_ACTIONS.FILE_UPLOAD_VALIDATION_ERROR:
      let ef = newState.files.find(file => action.id == file.fileId);
      ef = {...ef,  errors: action.errors};
      console.log('ef');
      console.log(ef);
      console.log(action.id);
      newState.files = [...newState.files.filter(file => file.fileId != action.id), ef];
      break;
    default:
      return state;
  }

  console.log('Uploaded file state');
  console.log(newState);
  return newState;
};

export default reducer;
