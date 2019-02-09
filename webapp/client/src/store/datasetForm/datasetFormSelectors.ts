//Will take advantage of this lib: https://github.com/reduxjs/reselect
import {createSelector} from "reselect";

export const wizardSelector = state => state.wizard;
export const basicFormSelector = state => state.form.contact;


export const basicInfo = createSelector(
  [basicFormSelector],
  (basicForm) => {
    if(!basicForm) {
      return {};
    } else if(!basicForm.values ) {
      return {}
    } else {
      return basicForm.values;
    }
  }
)
