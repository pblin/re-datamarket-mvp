export enum DATASET_INFO_ACTIONS {
  GET_DATASET_INFO = "GET_DATASET_INFO",
  DATASET_INFO_RETRIEVED = "DATASET_INFO_RETRIEVED"
};

export function getDatasetInfo(datasetId: string) {
  return {type: DATASET_INFO_ACTIONS.GET_DATASET_INFO, datasetId}
}
