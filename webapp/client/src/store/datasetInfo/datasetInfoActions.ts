export enum DATASET_INFO_ACTIONS {
  GET_DATASET_INFO = "GET_DATASET_INFO",
  DATASET_INFO_RETRIEVED = "DATASET_INFO_RETRIEVED",
  CHANGE_MORE_OPTION_MENU = "CHANGE_MORE_OPTION_MENU"
};

export function getDatasetInfo(datasetId: string) {
  return {type: DATASET_INFO_ACTIONS.GET_DATASET_INFO, datasetId}
}

export function changeMoreOptionMenu(isOpen: boolean) {
  return {type: DATASET_INFO_ACTIONS.CHANGE_MORE_OPTION_MENU, isOpen};
}
