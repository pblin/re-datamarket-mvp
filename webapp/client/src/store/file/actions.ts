export enum FILE_ACTIONS {
  FILE_UPLOAD_ASYNC = "FILE_UPLOAD_ASYNC",
  FILE_CHANGE = "FILE_CHANGE",
  FILE_UPLOAD_VALIDATION_ERROR = "FILE_UPLOAD_VALIDATION_ERROR",
  ADD_DATA_TO_FILE = "ADD_DATA_TO_FILE"
}

export function fileChange(fileId: string, file: File) {
  return {type: FILE_ACTIONS.FILE_CHANGE, fileId, file}
}
