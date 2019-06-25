import {createSelector} from "reselect";
import {profileSelector} from "../profile/profileSelector";

export const dataExplorerSelector = state => state.DataExplorer;
export const dataExplorerFieldsSelector = state => state.DataExplorer.fields;

export const getOwnedByMeFields = createSelector(
  [dataExplorerFieldsSelector, profileSelector],
  (fields, profile) => {
    return fields.filter(field => field.dataset_owner_id == profile.id)
  }
);
