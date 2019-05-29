import * as React from "react";
import {Menu, MenuItem, ClickAwayListener, Paper, Divider, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";

const ProfileMenu = ({profile, open, onClickAway}) => {

  let handleClose = (item) => {
    if(open == true) {
      onClickAway(item);
    }
  };

  return(
      <Paper>
        <Menu  anchorEl={document.getElementById('avatar')}
               open={open}>
          <ClickAwayListener onClickAway={() => handleClose('clickAway')}>
            {(profile['first_name'] && profile['last_name']) && (
              <div>
                <MenuItem><Typography>Signed in as {profile['first_name']} {profile['last_name']}</Typography></MenuItem>
                <Divider />
              </div>
            )
            }
            <MenuItem onClick={() => handleClose('profile')}>
              <Typography><Link to="/profile">My Profile</Link></Typography>
            </MenuItem>
            <MenuItem onClick={() => handleClose('logout')}><Typography>Logout</Typography></MenuItem>
          </ClickAwayListener>
        </Menu>
      </Paper>
  );
};

export default ProfileMenu;
