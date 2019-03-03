import {takeLatest, put} from 'redux-saga/effects';
import {DatasetService} from "../../services/DatasetService";
import {DATASET_FORM_ACTIONS} from "./actions";

function* DatasetFormPublished(action) {
  let basicInfo = action.basicInfo;
  let schema = action.schema;
  let id = action.id;

  console.log('DATASERVICE');
  console.log(DatasetService);
  const schemaService = new DatasetService();
  const schemaId = yield schemaService.postDataset(basicInfo, schema, id);

  yield put({type: 'SCHEMA_PUBLISHED', schemaId})
}

function* DatasetFormUpdated(action) {
  let basicInfo = action.basicInfo;
  let schema = action.schema;
  let ownerId = action.ownerId;
  let datasetId = action.datasetId;

  console.log('Saga');
  console.log(action);
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
