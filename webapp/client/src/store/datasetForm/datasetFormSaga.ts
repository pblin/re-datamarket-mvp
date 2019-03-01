import {takeLatest, put} from 'redux-saga/effects';
import {SchemaService} from "../../services/SchemaService";

function* DatasetFormPublished(action) {
  let basicInfo = action.basicInfo;
  let schema = action.schema;
  let id = action.id;

  const schemaService = new SchemaService();
  const schemaId = yield schemaService.postSchema(basicInfo, schema, id);

  yield put({type: 'SCHEMA_PUBLISHED', schemaId})
}

function* DatasetFormUpdated(action) {
  let basicInfo = action.basicInfo;
  let schema = action.schema;
  let ownerId = action.ownerId;
  let datasetId = action.datasetId;

  const schemaService = new SchemaService();
  const schemaId = yield schemaService.updateSchema(basicInfo, schema, ownerId, datasetId);

  yield put({type: 'SCHEMA_PUBLISHED', schemaId})
}

export function* watchPublish() {
  yield takeLatest('DATASET_FORM_PUBLISHED', DatasetFormPublished);
  yield takeLatest('DATASET_FORM_UPDATED', DatasetFormUpdated);
}

export function datasetFormSagas() {
  return[
    watchPublish()
  ];
}
