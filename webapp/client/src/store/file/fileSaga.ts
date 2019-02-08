import { put, take, call, select} from 'redux-saga/effects';
import {FileManager} from "../../services/FileManager";
import {getFileState} from "./fileSelectors";

function* FileUploadAsync() {
  //Get the file from the redux action
  const action = yield take('FILE_UPLOADED');
  let fileId = action.fileId;

  const fileState = yield select(getFileState);
  let file = fileState.files.find(file => file.fileId == fileId);

  //Create a file manager and read the file
  const fileManager = new FileManager();
  const result = yield fileManager.readFile(file.blob);

  //Finally pass the results to the reducer
  yield put({type: 'FILE_UPLOAD_ASYNC', value: result, id: fileId});
}

export function* watchFileUpload() {
  while (yield take("FILE_UPLOADED")) {
    yield call(FileUploadAsync)
  }
}

export function fileSagas() {
    return[
      watchFileUpload(),
      FileUploadAsync()
    ];
}
