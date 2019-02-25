import * as React from "react";
import {Button, FormControl, Hidden, MenuItem, Select, Toolbar} from "@material-ui/core";

const MarketplaceToolbar = ({onSchemaFilterChange, schemaFilter, toolbarOptions}) => {

  const handleSchemaChange = (event) => {
    onSchemaFilterChange(event.target.value);
  };

  const handleButtonClick = (val) => {
    onSchemaFilterChange(val);
  };

  return(
    <Toolbar className="marketplace-toolbar">
      <Hidden xsDown>
        {toolbarOptions.map(option => (
          <Button onClick={() => handleButtonClick(option.value)}>
            {schemaFilter == option.value && <strong>{option.label}</strong>}
            {schemaFilter != option.value && <span>{option.label}</span>}
          </Button>
        ))}
      </Hidden>
      <Hidden smUp>
        <FormControl>
          <Select value={schemaFilter} onChange={handleSchemaChange}>
            {toolbarOptions.map(option => (
              <MenuItem value={option.value}>{option.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Hidden>
    </Toolbar>
  );
};

export default MarketplaceToolbar;
