import * as React from "react";
import {Paper, IconButton, InputBase, Divider} from "@material-ui/core";
//import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";

const FilterMenu = ({placeholder, onSearchChange, searchVal}) => {
  return(
    <Paper elevation={1}>
      {/*<IconButton aria-label="Menu">
        <MenuIcon />
      </IconButton>*/}
      <InputBase placeholder={placeholder} onChange={onSearchChange} value={searchVal} />
      <IconButton aria-label="Search">
        <SearchIcon />
      </IconButton>
      <Divider />
    </Paper>
  );
};

export default FilterMenu;
