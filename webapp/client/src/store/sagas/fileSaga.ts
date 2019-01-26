import {delay} from 'redux-saga/effects';
import {takeEvery, put, all, take} from 'redux-saga/effects';
import {FileManager} from "../../services/FileManager";

function* FileUploadAsync() {
  console.log('test');
  const action = yield take('FILE_UPLOADED');
  console.log(action);

  const fileManager = new FileManager();
  const result = yield fileManager.readFile(action.value);

  console.log('saga result');
  console.log(result);

  yield delay(4000);
  yield put({type: 'FILE_UPLOAD_ASYNC', value: result});
}

export function* watchFileUpload() {
  yield takeEvery('FILE_UPLOADED', FileUploadAsync)
}


export function* fileSaga() {
  yield all([
    watchFileUpload(),
    FileUploadAsync()
  ]);
}

//TODO: Try to implement this https://github.com/redux-saga/redux-saga/issues/160
