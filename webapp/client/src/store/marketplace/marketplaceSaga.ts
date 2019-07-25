import {takeLatest, put} from 'redux-saga/effects';
import {DatasetService} from "../../services/DatasetService";
import {MARKETPLACE_ACTIONS, userDatasetsRetrieved} from "./marketplaceActions";
import {updateFactsets} from "../filters/filterActions";

export function* GetUserDatasets() {
  let profile = JSON.parse(localStorage.getItem ('profile'));

  const datasetService = new DatasetService();
  if(profile.id) {
    const datasets = yield datasetService.getUserDatasets(profile.id);

    yield put(userDatasetsRetrieved(datasets))
  } else {
    yield put(userDatasetsRetrieved([]));
  }
}

export function* GetAllDatasets() {
  const datasetService = new DatasetService();
  const datasets = yield datasetService.getAllDatasets();

  yield put({type: MARKETPLACE_ACTIONS.DATASETS_RETRIEVED, datasets});
}

export function* DeleteDataset(action) {
  let datasetId = action.datasetId;
  const datasetService = new DatasetService();

  try {
    yield datasetService.deleteDataset(datasetId);
    yield put({type: MARKETPLACE_ACTIONS.DATASET_DELETED, datasetId})
  } catch(e) {
    //TODO: THROW AN ERROR HERE
  }
}

export function* SearchDatasets(action) {
  const {filters} = action;
  const datasetService = new DatasetService();

  const result = yield datasetService.searchDatasets(filters);
  yield put({type: MARKETPLACE_ACTIONS.DATASETS_RETRIEVED, datasets: result.datasets});
  yield put(updateFactsets({geoFactsets: result.geoFactsets, topicFactsets: result.topicFactsets}));
}

export function* watchMarketplace() {
  yield takeLatest(MARKETPLACE_ACTIONS.GET_USER_DATASETS, GetUserDatasets);
  yield takeLatest(MARKETPLACE_ACTIONS.GET_ALL_DATASETS, GetAllDatasets);
  yield takeLatest(MARKETPLACE_ACTIONS.DELETE_DATASET, DeleteDataset);
  yield takeLatest(MARKETPLACE_ACTIONS.SEARCH_DATASETS, SearchDatasets);
}

export function marketplaceSagas() {
  return[
    watchMarketplace()
  ];
}
