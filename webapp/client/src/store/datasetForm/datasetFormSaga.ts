import {takeLatest, put} from 'redux-saga/effects';
import {DatasetService} from "../../services/DatasetService";
import {DATASET_FORM_ACTIONS} from "./actions";

export function* DatasetFormPublished(action) {
  let basicInfo = action.basicInfo;
  let schema = action.schema;
  let id = action.id;

  const schemaService = new DatasetService();
  const schemaId = yield schemaService.postDataset(basicInfo, schema, id);

  yield put({type: 'SCHEMA_PUBLISHED', schemaId})
}

export function* DatasetFormUpdated(action) {
  let basicInfo = action.basicInfo;
  let schema = action.schema;
  let ownerId = action.ownerId;
  let datasetId = action.datasetId;

  const schemaService = new DatasetService();
  const schemaId = yield schemaService.updateDataset(basicInfo, schema, ownerId, datasetId);

  yield put({type: 'SCHEMA_PUBLISHED', schemaId})
}

export function* watchPublish() {
  yield takeLatest('DATASET_FORM_PUBLISHED', DatasetFormPublished);
  yield takeLatest(DATASET_FORM_ACTIONS.UPDATE_DATASET, DatasetFormUpdated);
}

export function datasetFormSagas() {
  return[
    watchPublish()
  ];
}
