import {takeLatest, put} from "@redux-saga/core/effects";
import {DATA_EXPLORER_ACTIONS} from "./dataExplorerActions";
import SchemaService from "../../services/SchemaService";
import {updateFactsets} from "../filters/filterActions";

export function* SchemaSearch(action) {
  const {terms} = action;
  const results = yield SchemaService.searchSchemaFields(terms);
  yield put({type: DATA_EXPLORER_ACTIONS.SET_SCHEMA_FIELDS, schemaFields: results.objects});
  yield put(updateFactsets({geoFactsets: results.geoFactsets, topicFactsets: results.topicFactsets}));
}

export function* watchDataExplorer() {
  yield takeLatest(DATA_EXPLORER_ACTIONS.SCHEMA_SEARCH, SchemaSearch);
}

export function dataExplorerSagas() {
  return[
    watchDataExplorer()
  ];
}
