export enum FILE_ACTIONS {
  FILE_UPLOAD_ASYNC = "FILE_UPLOAD_ASYNC",
  DATASET_FILE_CHANGE = "DATASET_FILE_CHANGE"
}

export function datasetFileChange(file: File) {
  return {type: FILE_ACTIONS.DATASET_FILE_CHANGE, file: file}
}
