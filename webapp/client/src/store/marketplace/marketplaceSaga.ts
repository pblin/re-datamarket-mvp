import {takeLatest, put} from 'redux-saga/effects';
import {SchemaService} from "../../services/SchemaService";
import {MARKETPLACE_ACTIONS} from "./marketplaceActions";

function* GetUserSchemas(action) {
  let id = action.id;

  const schemaService = new SchemaService();
  const schemas = yield schemaService.getUserSchemas(id);

  yield put({type: MARKETPLACE_ACTIONS.SCHEMAS_RETRIEVED, schemas})
}

export function* watchMarketplace() {
  yield takeLatest(MARKETPLACE_ACTIONS.GET_USER_SCHEMAS, GetUserSchemas);
}

export function marketplaceSagas() {
  return[
    watchMarketplace()
  ];
}
