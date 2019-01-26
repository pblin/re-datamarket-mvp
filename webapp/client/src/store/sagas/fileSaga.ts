import {delay} from 'redux-saga/effects';
import {takeEvery, put, all} from 'redux-saga/effects';

function* FileUploadAsync() {
  yield delay(4000);
  yield put({type: 'FILE_UPLOAD_ASYNC', value: 'test'});
}

export function* watchFileUpload() {
  yield takeEvery('FILE_UPLOADED', FileUploadAsync)
}


export function* fileSaga() {
  yield all([

  ]);
}
