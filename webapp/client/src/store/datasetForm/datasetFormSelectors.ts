//Will take advantage of this lib: https://github.com/reduxjs/reselect
import {createSelector} from "reselect";

export const basicFormSelector = state => state.form.contact;
export const schemaSelector = state => state.DatasetFormState.schema;


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
);
