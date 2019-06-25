import {takeLatest, put} from "@redux-saga/core/effects";
import {DATA_EXPLORER_ACTIONS} from "./dataExplorerActions";
import SchemaService from "../../services/SchemaService";

export function* SchemaSearch(action) {
  const {filters} = action;
  const schemaFields = yield SchemaService.searchSchemaFields(filters);
  yield put({type: DATA_EXPLORER_ACTIONS.SET_SCHEMA_FIELDS, schemaFields})
}

export function* watchDataExplorer() {
  yield takeLatest(DATA_EXPLORER_ACTIONS.SCHEMA_SEARCH, SchemaSearch);
}

export function dataExplorerSagas() {
  return[
    watchDataExplorer()
  ];
}
