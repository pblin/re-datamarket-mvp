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

export function* watchMarketplace() {
  yield takeLatest(MARKETPLACE_ACTIONS.GET_USER_SCHEMAS, GetUserSchemas);
  yield takeLatest(MARKETPLACE_ACTIONS.GET_ALL_SCHEMAS, GetAllSchemas);
}

export function marketplaceSagas() {
  return[
    watchMarketplace()
  ];
}
