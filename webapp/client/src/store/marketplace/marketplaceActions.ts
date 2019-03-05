export enum MARKETPLACE_ACTIONS {
  CHANGE_SCHEMA_FILTER = "CHANGE_SCHEMA_FILTER",
  GET_USER_SCHEMAS = "GET_USER_SCHEMAS",
  SCHEMAS_RETRIEVED = "SCHEMAS_RETRIEVED",
  USER_SCHEMAS_RETRIEVED = "USER_SCHEMAS_RETRIEVED",
  GET_ALL_SCHEMAS = "GET_ALL_SCHEMAS",
  CHANGE_DIALOG_STATE = "CHANGE_DIALOG_STATE",
  CHANGE_CONFIRM_DIALOG_STATE = "CHANGE_CONFIRM_DIALOG_STATE"
}

export function updateSchemaFilter(schemaFilter) {
  return {type: MARKETPLACE_ACTIONS.CHANGE_SCHEMA_FILTER, schemaFilter};
}

export function changeDialogState(isOpen, mode?, dataset?) {
  return {type: MARKETPLACE_ACTIONS.CHANGE_DIALOG_STATE, isOpen, mode, dataset};
}

export function changeConfirmDialogState(isOpen, dataset) {
  return {type: MARKETPLACE_ACTIONS.CHANGE_CONFIRM_DIALOG_STATE, isOpen, dataset};
}
