import {takeLatest, put} from 'redux-saga/effects';
import {DatasetService} from "../../services/DatasetService";
import {DATASET_FORM_ACTIONS} from "./actions";

export function* DatasetFormPublished(action) {
  let basicInfo = action.basicInfo;
  let schema = action.schema;
  let id = action.id;
  let stage = action.stage;

  const datasetService = new DatasetService();
  const dataset = yield datasetService.postDataset(basicInfo, schema, id, stage);

  yield put({type: DATASET_FORM_ACTIONS.DATASET_PUBLISHED, dataset})
}

export function* DatasetFormUpdated(action) {
  let basicInfo = action.basicInfo;
  let schema = action.schema;
  let ownerId = action.ownerId;
  let datasetId = action.datasetId;

  const datasetService = new DatasetService();
  const dataset = yield datasetService.updateDataset(basicInfo, schema, ownerId, datasetId);

  yield put({type: DATASET_FORM_ACTIONS.DATASET_REPUBLISHED, dataset})
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
