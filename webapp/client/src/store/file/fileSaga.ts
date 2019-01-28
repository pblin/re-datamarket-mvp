import { put, take, call} from 'redux-saga/effects';
import {FileManager} from "../../services/FileManager";

function* FileUploadAsync() {
  //Get the file from the redux action
  const action = yield take('FILE_UPLOADED');
  let file = action.file;

  //Create a file manager and read the file
  const fileManager = new FileManager();
  const result = yield fileManager.readFile(file);

  //Finally pass the results to the reducer
  yield put({type: 'FILE_UPLOAD_ASYNC', value: result, name: file.name});
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
