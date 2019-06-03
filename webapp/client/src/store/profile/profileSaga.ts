import {takeLatest, put} from 'redux-saga/effects';
import {PROFILE_ACTIONS} from "./profileActions";
import {ProfileService} from "../../services/ProfileService";
import EmailService from '../../services/EmailService';

const profileService = new ProfileService();

function* GetProfile(action) {

  let profile = JSON.parse(localStorage.getItem ('profile'));
  let email = localStorage.getItem('email');

  yield put({type: PROFILE_ACTIONS.SET_PROFILE, profile, email});
}

function* ConfirmEmail(action) {
  try {
    const results = yield EmailService.verifyEmail(action.email, action.code);
    if(results) {
      const profile = JSON.parse(localStorage.getItem ('profile'));
      profile['primary_email_verified'] = true;
      localStorage.setItem('profile', JSON.stringify(profile));
      yield put({type: PROFILE_ACTIONS.SET_PROFILE, profile, email: action.email});
      action.notify('Your email was verified', {variant: 'success'});
    }

  } catch(e) {
    action.notify('Your email was not verified', {variant: 'error'});
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

function* ResendVerification(action) {
  const email = action.email;

  try {
    yield profileService.resendVerification(email);
    //action.notify('Email sent successfully', {variant: 'success'});
  } catch(e) {
    //action.notify('Something went wrong resending your verification email', {variant: 'error'});
  }

}

export function* watchProfile() {
  yield takeLatest(PROFILE_ACTIONS.GET_PROFILE, GetProfile);
  yield takeLatest(PROFILE_ACTIONS.UPDATE_PROFILE, UpdateProfile);
  yield takeLatest(PROFILE_ACTIONS.CONFIRM_EMAIL, ConfirmEmail);
  yield takeLatest(PROFILE_ACTIONS.RESEND_VERIFICATION, ResendVerification)
}

export function profileSagas() {
  return[
    watchProfile()
  ];
}
