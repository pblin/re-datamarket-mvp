import {takeLatest, select, put} from "@redux-saga/core/effects";
import {FILTER_ACTIONS, updateGeoFilters} from "./filterActions";
import {getFilters} from "./filterSelectors";

export function* updateFilters(action) {
  console.log('UPDATING THE FILTERS SAGA');
  //Get the current state
  const {levels} = yield select(getFilters);
  const {indexes, level, value} = action;

  //Copy the levels array and then slice off the un-needed portion
  const levelsCpy = [...levels].slice(0, level);

  //Apply new value
  levelsCpy[level] = value;

  //Update the store
  yield put(updateGeoFilters(indexes, levelsCpy));
}

export function* watchFilters() {
  yield takeLatest(FILTER_ACTIONS.UPDATE_FILTERS, updateFilters);
}

export function filterSagas() {
  return[
    watchFilters()
  ];
}
