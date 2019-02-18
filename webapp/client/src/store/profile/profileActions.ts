export enum PROFILE_ACTIONS {
  SET_PROFILE = "SET_PROFILE",
  GET_PROFILE = "GET_PROFILE"
}

export function getProfile() {
  return {type: PROFILE_ACTIONS.GET_PROFILE}
}
