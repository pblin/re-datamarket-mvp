import {takeLatest, put} from 'redux-saga/effects';
import {SchemaService} from "../../services/SchemaService";
import {MARKETPLACE_ACTIONS} from "./marketplaceActions";

function* GetUserSchemas() {
  let profile = JSON.parse(localStorage.getItem ('profile'));

  const schemaService = new SchemaService();
  const schemas = yield schemaService.getUserSchemas(profile.id);

  yield put({type: MARKETPLACE_ACTIONS.USER_SCHEMAS_RETRIEVED, schemas})
}

function* GetAllSchemas() {
  const schemaService = new SchemaService();
  const schemas = yield schemaService.getAllSchemas();

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