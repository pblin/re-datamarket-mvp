import * as React from "react";
import {Menu, MenuItem, ClickAwayListener, Paper, Divider} from "@material-ui/core";
import {Link} from "react-router-dom";

const ProfileMenu = ({profile, open, onClickAway}) => {

  let handleClose = (item) => {
    onClickAway(item);
  };

  return(
      <ClickAwayListener onClickAway={() => handleClose('clickAway')}>
        <Paper>
          <Menu  anchorEl={document.getElementById('avatar')}
                 open={open}>
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
          </Menu>
        </Paper>
      </ClickAwayListener>
  );
};

export default ProfileMenu;
