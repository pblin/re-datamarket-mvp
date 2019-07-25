import {takeLatest, put} from "@redux-saga/core/effects";
import {DATA_EXPLORER_ACTIONS} from "./dataExplorerActions";
import SchemaService from "../../services/SchemaService";

export function* SchemaSearch(action) {
  const {terms} = action;
  const schemaFields = yield SchemaService.searchSchemaFields(terms);
  yield put({type: DATA_EXPLORER_ACTIONS.SET_SCHEMA_FIELDS, schemaFields: schemaFields.datasets})
}

export function* watchDataExplorer() {
  yield takeLatest(DATA_EXPLORER_ACTIONS.SCHEMA_SEARCH, SchemaSearch);
}

export function dataExplorerSagas() {
  return[
    watchDataExplorer()
  ];
}
