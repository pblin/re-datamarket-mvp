import {createSelector} from "reselect";

export const profileSelector = state => state.ProfileState.profile;
export const emailSelector = state => state.ProfileState.email;


export const isProfileSet = createSelector([profileSelector],
  (profile) => {
    if(!profile) {
      return false;
    }
    if(!profile.id) {
      return false
    }
    return true;
  }
);

export const isEmailVerified = createSelector(
  [profileSelector],
  (profile) => {
      if(!profile) {
        return false;
      }

      if(profile['primary_email_verfied'] == true) {
        return true;
      }

      return false;
   }
);
