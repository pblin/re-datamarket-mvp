import {takeLatest, put} from 'redux-saga/effects';
import {PROFILE_ACTIONS} from "./profileActions";
import {ProfileService} from "../../services/ProfileService";
import EmailService from '../../services/EmailService';

const profileService = new ProfileService();

function* GetProfile(action) {

  let profile = localStorage.getItem ('profile');
  let email = localStorage.getItem('email');

  yield put({type: PROFILE_ACTIONS.SET_PROFILE, profile, email});
}

function* ConfirmEmail(action) {
  try {
    yield EmailService.verifyEmail(action.email, action.code);
    //TODO: Add action creator here
  } catch(e) {
    console.log('WENT WRONG');
    //TODO: Add creator here
  }
}

function* UpdateProfile(action) {
  const email = action.email;
  const profile = action.profile;

  const results = yield profileService.updateProfile(email, profile);

  yield put({type: PROFILE_ACTIONS.SET_PROFILE, profile: JSON.stringify(results), email});

  //UPDATE LOCAL STORAGE
  localStorage.setItem('profile', JSON.stringify(results));

  action.notify('Your profile was successfully updated', {variant: 'success'});

  //TODO: ADD ERROR HANDLING
  //TODO: TEST FIRST TIME PROFILE
}

export function* watchProfile() {
  yield takeLatest(PROFILE_ACTIONS.GET_PROFILE, GetProfile);
  yield takeLatest(PROFILE_ACTIONS.UPDATE_PROFILE, UpdateProfile);
  yield takeLatest(PROFILE_ACTIONS.CONFIRM_EMAIL, ConfirmEmail);
}

export function profileSagas() {
  return[
    watchProfile()
  ];
}
