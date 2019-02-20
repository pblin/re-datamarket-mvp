import * as React from "react";
import {MenuList, MenuItem, Popper, ClickAwayListener, Paper, Divider} from "@material-ui/core";

const ProfileMenu = ({authenticated, profile, open, onClickAway}) => {

  console.log('IS PROFILE MENU OPEN');
  console.log(open);
  let handleClose = () => {
    console.log('Handling Close');
    onClickAway();
  };

  return(
    <Popper
      open={open}
      placement={"bottom"}
      anchorEl={document.getElementById('avatar')}
      disablePortal>
      <ClickAwayListener onClickAway={handleClose}>
        <Paper>
          <MenuList>
            <MenuItem onClick={handleClose}><p>Signed in as Test Test</p></MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>My Profile</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </MenuList>
        </Paper>
      </ClickAwayListener>
    </Popper>
  );
};

export default ProfileMenu;
