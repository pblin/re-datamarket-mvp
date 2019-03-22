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

//TODO: Place this somewhere else
const validObjHelper = (properties: string[], obj: any) => {
  for(let i = 0; i < properties.length; i++) {
    let val = obj[properties[i]];
    if(val == undefined || val == null  || val == '') {
      return false;
    }
  }

  return true;
};

export const canPublish = createSelector(
  [datasetInfoSelector, schemaSelector, isOwner],
  (dataset, schema, isOwner) => {
    if(!isOwner) {
      return false;
    }

    const isValid = validObjHelper([
      'name',
      'description',
      'access_url',
      'api_key',
      'enc_data_key',
      'search_terms',
      'price_high',
      'num_of_records',
      'country',
      'state_province'
    ], dataset);

    if(!isValid) {
      return false;
    }

    if(!schema.length) {
      return false;
    }

    return true;
  }
);
