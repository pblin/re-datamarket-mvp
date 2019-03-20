import {DATASET_FORM_ACTIONS} from "../datasetForm/actions";

export enum DATASET_INFO_ACTIONS {
  GET_DATASET_INFO = "GET_DATASET_INFO",
  DATASET_INFO_RETRIEVED = "DATASET_INFO_RETRIEVED",
  CHANGE_MORE_OPTION_MENU = "CHANGE_MORE_OPTION_MENU",
  CHANGE_SCHEMA = "CHANGE_SCHEMA"
};

export function getDatasetInfo(datasetId: string) {
  return {type: DATASET_INFO_ACTIONS.GET_DATASET_INFO, datasetId};
}

export function changeMoreOptionMenu(isOpen: boolean) {
  return {type: DATASET_INFO_ACTIONS.CHANGE_MORE_OPTION_MENU, isOpen};
}

export function changeSchema(val: any, field: any, index: number) {
  return {type: DATASET_INFO_ACTIONS.CHANGE_SCHEMA, val, field, index};
}

export function updateDataset(basicInfo, schema, ownerId, datasetId, stage, notify, message) {
  //TODO: Move this enum value to DATASET_INFO_ACTIONS
  return {type: DATASET_FORM_ACTIONS.UPDATE_DATASET, basicInfo, schema, ownerId, datasetId, stage, notify, message};
}
