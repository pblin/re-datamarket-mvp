import {takeLatest, put} from 'redux-saga/effects';
import {DatasetService} from "../../services/DatasetService";
import {DATASET_INFO_ACTIONS} from "./datasetInfoActions";

export function* GetDatasetInfo(action) {
  let datasetId = action.datasetId;

  const datasetService = new DatasetService();
  const dataset = yield datasetService.getDataset(datasetId);

  console.log('In the saga');
  console.log(dataset);
  yield put({type: DATASET_INFO_ACTIONS.DATASET_INFO_RETRIEVED, dataset: dataset[0]})
}

export function* watchDatasetInfo() {
  yield takeLatest(DATASET_INFO_ACTIONS.GET_DATASET_INFO, GetDatasetInfo);
}

export function datasetInfoSagas() {
  return[
    watchDatasetInfo()
  ];
}
