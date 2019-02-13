import {takeLatest} from 'redux-saga/effects';

function* DatasetFormPublished(action) {

}

export function* watchPublish() {
  yield takeLatest('DATASET_FORM_PUBLISHED', DatasetFormPublished);
}

export function datasetFormSagas() {
  return[
    watchPublish()
  ];
}
