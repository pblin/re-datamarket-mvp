import {takeLatest, put} from 'redux-saga/effects';
import {DatasetService} from "../../services/DatasetService";
import {DATASET_FORM_ACTIONS} from "./actions";

//TODO: This should be dataset saved
export function* DatasetFormPublished(action) {
  const {basicInfo, schema, id, stage, schemaName} = action;

  const datasetService = new DatasetService();
  const dataset = yield datasetService.postDataset(basicInfo, schema, id, stage, schemaName);

  yield put({type: DATASET_FORM_ACTIONS.DATASET_PUBLISHED, dataset})
}

//TODO: MOVE TO DATASET SAGA
export function* DatasetFormUpdated(action) {
  //TODO: Destructure This
  let basicInfo = action.basicInfo;
  let schema = action.schema;
  let ownerId = action.ownerId;
  let datasetId = action.datasetId;
  let stage = action.stage;

  const datasetService = new DatasetService();
  const dataset = yield datasetService.updateDataset(basicInfo, schema, ownerId, datasetId, stage);

  //TODO: HANDLE ERROR CASE
  action.notify(action.message, {variant: 'success'});
  yield put({type: DATASET_FORM_ACTIONS.DATASET_REPUBLISHED, dataset})
}

export function* watchPublish() {
  //TODO: Use enum value
  yield takeLatest('DATASET_FORM_PUBLISHED', DatasetFormPublished);
  yield takeLatest(DATASET_FORM_ACTIONS.UPDATE_DATASET, DatasetFormUpdated);
}

export function datasetFormSagas() {
  return[
    watchPublish()
  ];
}
