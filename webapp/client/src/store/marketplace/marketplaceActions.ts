export enum MARKETPLACE_ACTIONS {
  CHANGE_SCHEMA_FILTER = "CHANGE_SCHEMA_FILTER"
}

export function updateSchemaFilter(schemaFilter) {
  return {type: MARKETPLACE_ACTIONS.CHANGE_SCHEMA_FILTER, schemaFilter};
}
