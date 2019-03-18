import {createSelector} from "reselect";
import {profileSelector} from "../profile/profileSelector";

export const datasetInfoSelector = state => state.DatasetInfoState.dataset;
export const schemaSelector = state => state.DatasetInfoState.schema;
export const datasetSelector = state => state.DatasetInfoState;

export const isOwner = createSelector(
  [datasetInfoSelector, profileSelector],
  (dataset, profile) => {
      if(!profile) {
        return false;
      }
      if(!profile.id) {
        return false;
      }
      if(dataset['dataset_owner_id'] == profile.id) {
        return true;
      }
      return false;
   }
);
