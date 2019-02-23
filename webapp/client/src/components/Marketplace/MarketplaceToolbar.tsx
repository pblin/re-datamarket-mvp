import * as React from "react";
import {Button, FormControl, Hidden, MenuItem, Select, Toolbar} from "@material-ui/core";

const MarketplaceToolbar = ({onSchemaFilterChange, schemaFilter}) => {

  const handleSchemaChange = (event) => {
    onSchemaFilterChange(event.target.value);
  };

  return(
    <Toolbar className="marketplace-toolbar">
      <Hidden xsDown>
        <Button>ALL</Button>
        <Button><strong>OWNED BY ME</strong></Button>
      </Hidden>
      <Hidden smUp>
        <FormControl>
          <Select value={schemaFilter} onChange={handleSchemaChange}>
            <MenuItem value={'all'}>All</MenuItem>
            <MenuItem value={'ownedByMe'}>Owned By Me</MenuItem>
          </Select>
        </FormControl>
      </Hidden>
    </Toolbar>
  );
};

export default MarketplaceToolbar;
