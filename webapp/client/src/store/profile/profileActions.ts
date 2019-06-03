export enum PROFILE_ACTIONS {
  SET_PROFILE = "SET_PROFILE",
  GET_PROFILE = "GET_PROFILE",
  UPDATE_PROFILE = "UPDATE_PROFILE",
  CONFIRM_EMAIL = "CONFIRM_EMAIL",
  RESEND_VERIFICATION = "RESEND_VERIFICATION"
}

export function getProfile() {
  return {type: PROFILE_ACTIONS.GET_PROFILE};
}

export function updateProfile(email, profile, notify) {
  return {type: PROFILE_ACTIONS.UPDATE_PROFILE, email, profile, notify};
}

export function verifyEmail(email, code) {
  return {type: PROFILE_ACTIONS.CONFIRM_EMAIL, email, code}
}

export function resendVerification(email) {
  return {type: PROFILE_ACTIONS.RESEND_VERIFICATION, email}
}
