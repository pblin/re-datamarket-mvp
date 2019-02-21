import {takeLatest, put} from 'redux-saga/effects';
import {SchemaService} from "../../services/SchemaService";

function* DatasetFormPublished(action) {
  let basicInfo = action.basicInfo;
  let schema = action.schema;
  let id = action.id;

  const schemaService = new SchemaService();
  yield schemaService.postSchema(basicInfo, schema, id);

  yield put({type: 'SCHEMA_PUBLISHED'})
}

export function* watchPublish() {
  yield takeLatest('DATASET_FORM_PUBLISHED', DatasetFormPublished);
}

export function datasetFormSagas() {
  return[
    watchPublish()
  ];
}
