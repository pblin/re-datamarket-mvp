import * as React from "react";
import {Button, FormControl, Hidden, MenuItem, Select, Toolbar} from "@material-ui/core";

const MarketplaceToolbar = (
  {
    onSchemaFilterChange,
    schemaFilter,
    toolbarOptions,
    hasPublish,
    onSave = () => {},
    onPublish = () => {}
  }) => {

  const handleSchemaChange = (event) => {
    onSchemaFilterChange(event.target.value);
  };

  const handleButtonClick = (val) => {
    onSchemaFilterChange(val);
  };

  return(
    <Toolbar className="marketplace-toolbar">
      <Hidden xsDown>
        <div className={"filter-container"}>
          {toolbarOptions.map((option, index) => (
            <Button onClick={() => handleButtonClick(option.value)} key={`toolbarOption${index}`}>
              {schemaFilter == option.value && <strong>{option.label}</strong>}
              {schemaFilter != option.value && <span>{option.label}</span>}
            </Button>
          ))}
        </div>
      </Hidden>
      <Hidden smUp>
        <FormControl className={"filter-container"}>
          <Select value={schemaFilter} onChange={handleSchemaChange}>
            {toolbarOptions.map((option, index) => (
              <MenuItem key={`toolbarSelectOption${index}`} value={option.value}>{option.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Hidden>
      {hasPublish && <>
        <Button className={"toolbar-btn"} variant={"outlined"} color={"secondary"} onClick={onSave}>Save</Button>
        <Button className={"toolbar-btn"} variant={"contained"} color={"secondary"}>Publish</Button>
      </>}
    </Toolbar>
  );
};

export default MarketplaceToolbar;
