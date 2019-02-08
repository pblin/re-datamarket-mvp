export enum FILE_ACTIONS {
  FILE_UPLOAD_ASYNC = "FILE_UPLOAD_ASYNC",
  FILE_CHANGE = "FILE_CHANGE"
}

export function fileChange(fileId: string, file: File) {
  return {type: FILE_ACTIONS.FILE_CHANGE, fileId, file}
}
