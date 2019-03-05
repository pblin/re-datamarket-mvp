import {takeLatest, put} from 'redux-saga/effects';
import {DatasetService} from "../../services/DatasetService";
import {MARKETPLACE_ACTIONS} from "./marketplaceActions";

export function* GetUserSchemas() {
  let profile = JSON.parse(localStorage.getItem ('profile'));

  const schemaService = new DatasetService();
  if(profile.id) {
    const schemas = yield schemaService.getUserDatasets(profile.id);

    yield put({type: MARKETPLACE_ACTIONS.USER_SCHEMAS_RETRIEVED, schemas})
  } else {
    yield put({type: MARKETPLACE_ACTIONS.USER_SCHEMAS_RETRIEVED, schemas: []})
  }
}

export function* GetAllSchemas() {
  const schemaService = new DatasetService();
  const schemas = yield schemaService.getAllDatasets();

  yield put({type: MARKETPLACE_ACTIONS.SCHEMAS_RETRIEVED, schemas});
}

export function* DeleteDataset(action) {
  let datasetId = action.datasetId;
  const datasetService = new DatasetService();

  try {
    yield datasetService.deleteDataset(datasetId);
    yield put({type: MARKETPLACE_ACTIONS.DATASET_DELETED, datasetId})
  } catch(e) {
    //TODO: THROW AN ERROR HERE
    console.log('HAD AN ERROR');
    console.log(e);
  }
}

export function* watchMarketplace() {
  yield takeLatest(MARKETPLACE_ACTIONS.GET_USER_SCHEMAS, GetUserSchemas);
  yield takeLatest(MARKETPLACE_ACTIONS.GET_ALL_SCHEMAS, GetAllSchemas);
  yield takeLatest(MARKETPLACE_ACTIONS.DELETE_DATASET, DeleteDataset);
}

export function marketplaceSagas() {
  return[
    watchMarketplace()
  ];
}
