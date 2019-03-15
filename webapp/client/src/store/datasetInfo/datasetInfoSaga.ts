import {takeLatest, put} from 'redux-saga/effects';
import {DatasetService} from "../../services/DatasetService";
import {DATASET_INFO_ACTIONS} from "./datasetInfoActions";

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


  console.log('Here is the profile');
  console.log(profile);
  console.log(dataset);

  yield put({type: DATASET_INFO_ACTIONS.DATASET_INFO_RETRIEVED, dataset: dataset})
}

export function* watchDatasetInfo() {
  yield takeLatest(DATASET_INFO_ACTIONS.GET_DATASET_INFO, GetDatasetInfo);
}

export function datasetInfoSagas() {
  return[
    watchDatasetInfo()
  ];
}
