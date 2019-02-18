import {takeLatest, put} from 'redux-saga/effects';
import {PROFILE_ACTIONS} from "./profileActions";

function* GetProfile(action) {

  let profile = localStorage.getItem ('profile');

  yield put({type: PROFILE_ACTIONS.SET_PROFILE, profile});
}

export function* watchProfile() {
  yield takeLatest(PROFILE_ACTIONS.GET_PROFILE, GetProfile);
}

export function profileSagas() {
  return[
    watchProfile()
  ];
}
