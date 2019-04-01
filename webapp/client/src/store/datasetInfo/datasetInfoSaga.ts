import {takeLatest, put} from 'redux-saga/effects';
import {DatasetService} from "../../services/DatasetService";
import {DATASET_INFO_ACTIONS} from "./datasetInfoActions";
import {DATASET_FORM_ACTIONS} from "../datasetForm/actions";

export function* GetDatasetInfo(action) {
  let datasetId = action.datasetId;

  const datasetService = new DatasetService();

  const profile = JSON.parse(localStorage.getItem ('profile'));

  let dataset;
  if(!profile.id) {
    dataset = yield datasetService.getDataset(datasetId);
  } else {
    dataset = yield datasetService.getDataset(datasetId, profile.id);
  }

  dataset['json_schema'] = JSON.parse(dataset['json_schema']);
  if( !(dataset['json_schema'] instanceof Array) ) {
    dataset['json_schema'] = [];
  }
  yield put({type: DATASET_INFO_ACTIONS.DATASET_INFO_RETRIEVED, dataset: dataset})
}

export function* DatasetFormUpdated(action) {
  const {basicInfo, schema, ownerId, datasetId, stage} = action;

  const datasetService = new DatasetService();
  const dataset = yield datasetService.updateDataset(basicInfo, schema, ownerId, datasetId, stage);

  //TODO: HANDLE ERROR CASE
  action.notify(action.message, {variant: 'success'});
  yield put({type: DATASET_INFO_ACTIONS.DATASET_UPDATED, dataset})
}

export function* watchDatasetInfo() {
  yield takeLatest(DATASET_INFO_ACTIONS.GET_DATASET_INFO, GetDatasetInfo);
  yield takeLatest(DATASET_FORM_ACTIONS.UPDATE_DATASET, DatasetFormUpdated);
}

export function datasetInfoSagas() {
  return[
    watchDatasetInfo()
  ];
}
