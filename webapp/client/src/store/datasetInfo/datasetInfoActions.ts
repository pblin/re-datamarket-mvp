import {DatasetInquiryPayload} from "../../services/payloads/EmailPayload";

export enum DATASET_INFO_ACTIONS {
  GET_DATASET_INFO = "GET_DATASET_INFO",
  UPDATE_DATASET_INFO = "UPDATE_DATASET_INFO",
  DATASET_INFO_RETRIEVED = "DATASET_INFO_RETRIEVED",
  CHANGE_MORE_OPTION_MENU = "CHANGE_MORE_OPTION_MENU",
  CHANGE_SCHEMA = "CHANGE_SCHEMA",
  CHANGE_BASIC_INFO_FORM = "CHANGE_BASIC_INFO_FORM",
  CHANGE_UPLOAD_DIALOG = "CHANGE_UPLOAD_DIALOG",
  CHANGE_SAMPLE_DIALOG = "CHANGE_SAMPLE_DIALOG",
  CHANGE_BUY_DATASET_DIALOG = "CHANGE_BUY_DATASET_DIALOG",
  CHANGE_SEND_EMAIL_DIALOG = "CHANGE_SEND_EMAIL_DIALOG",
  UPDATE_DATASET = "UPDATE_DATASET",
  DATASET_UPDATED = "DATASET_UPDATED",
  GET_SAMPLE_DATA = "GET_SAMPLE_DATA",
  SEND_EMAIL = "SEND_EMAIL"
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
  return {type: DATASET_INFO_ACTIONS.UPDATE_DATASET, basicInfo, schema, ownerId, datasetId, stage, notify, message};
}

//TODO: REFACTOR all change dialog action creators into one
export function changeBasicInfoForm(isOpen: boolean) {
  return {type: DATASET_INFO_ACTIONS.CHANGE_BASIC_INFO_FORM, isOpen};
}

export function changeUploadDialog(isOpen: boolean) {
  return {type: DATASET_INFO_ACTIONS.CHANGE_UPLOAD_DIALOG, isOpen};
}

export function changeSampleDialog(isOpen: boolean) {
  return {type: DATASET_INFO_ACTIONS.CHANGE_SAMPLE_DIALOG, isOpen};
}

export function changeBuyDatasetDialog(isOpen: boolean) {
  return {type: DATASET_INFO_ACTIONS.CHANGE_BUY_DATASET_DIALOG, isOpen};
}

export function changeSendEmailDialog(isOpen: boolean) {
  return {type: DATASET_INFO_ACTIONS.CHANGE_SEND_EMAIL_DIALOG, isOpen};
}

export function getSampleData(email, datasetId, datasetName, notify) {
  return {type: DATASET_INFO_ACTIONS.GET_SAMPLE_DATA, email, datasetName, datasetId, notify};
}

export function sendEmail(emailInquiry: DatasetInquiryPayload, notify) {
  return {type: DATASET_INFO_ACTIONS.SEND_EMAIL, emailInquiry, notify}
}

export function updateDatasetInfo(dataset) {
  if(!(dataset['search_terms'] instanceof Array)) {
    dataset['search_terms'] =  dataset['search_terms'] ?
      dataset['search_terms'].split(','): null;
  }

  //Convert price to number
  dataset['price_high'] = Number(dataset['price_high']);

  return {type: DATASET_INFO_ACTIONS.UPDATE_DATASET_INFO, dataset}
}
