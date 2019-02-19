export enum PROFILE_ACTIONS {
  SET_PROFILE = "SET_PROFILE",
  GET_PROFILE = "GET_PROFILE",
  UPDATE_PROFILE = "UPDATE_PROFILE"
}

export function getProfile() {
  return {type: PROFILE_ACTIONS.GET_PROFILE};
}

export function updateProfile(email, profile) {
  return {type: PROFILE_ACTIONS.UPDATE_PROFILE, email, profile};
}
