import * as React from "react";
import {MenuList, MenuItem, Popper, ClickAwayListener, Paper, Divider} from "@material-ui/core";
import {Link} from "react-router-dom";

const ProfileMenu = ({profile, open, onClickAway}) => {

  console.log('IS PROFILE MENU OPEN');
  console.log(open);
  let handleClose = (item) => {
    console.log('Handling Close');
    onClickAway(item);
  };

  return(
    <Popper
      open={open}
      placement={"bottom"}
      anchorEl={document.getElementById('avatar')}
      disablePortal>
      <ClickAwayListener onClickAway={() => handleClose('clickAway')}>
        <Paper>
          <MenuList>
            {(profile['first_name'] && profile['last_name']) && (
              <div>
                <MenuItem><p>Signed in as {profile['first_name']} {profile['last_name']}</p></MenuItem>
                <Divider />
              </div>
            )
            }
            <MenuItem onClick={() => handleClose('profile')}>
              <Link to="/profile"><div>My Profile</div></Link>
            </MenuItem>
            <MenuItem onClick={() => handleClose('logout')}>Logout</MenuItem>
          </MenuList>
        </Paper>
      </ClickAwayListener>
    </Popper>
  );
};

export default ProfileMenu;
