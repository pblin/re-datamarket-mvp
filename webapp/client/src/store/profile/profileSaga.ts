import {takeLatest, put} from 'redux-saga/effects';
import {ProfileService} from "../../services/ProfileService";

const profileService = new ProfileService();

function* GetProfile(action) {
  const email = action.email;

  //TODO: CHECK LOCAL STORAGE FIRST
  console.log('Getting profile in saga');
  yield profileService.getProfile(email);

  yield put({type: 'SET_PROFILE'});
}


export function* watchProfile() {
  yield takeLatest('GET_PROFILE', GetProfile);
}

export function profileSagas() {
  return[
    watchProfile()
  ];
}
