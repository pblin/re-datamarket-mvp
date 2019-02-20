import * as React from 'react';
import PropTypes from 'prop-types';

import {
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  Button,
  withStyles,
  Theme,
  Menu,
  MenuItem
} from "@material-ui/core";

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Auth0Authentication } from '../../auth/Auth0Authentication';
import autobind from 'autobind-decorator';
import {Link} from "react-router-dom";
import {AppLink} from "./AppLink";
import ProfileAvatar from '../Profile/ProfileAvatar';
import "./App.css";

//Icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import HistoryIcon from "@material-ui/icons/History";
import MessageIcon from "@material-ui/icons/Message";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ExploreIcon from "@material-ui/icons/Explore";
import CloudIcon from "@material-ui/icons/CloudUpload";

const drawerWidth = 240;

// @ts-ignore
const styles = (theme: Theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  grow: {
    flexGrow: 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  avatar: {
    marginRight: "50px"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

interface AppProps {
  classes: any;
  theme?: any;
  auth: Auth0Authentication;
}

class PersistentDrawerLeft extends React.Component <AppProps> {
  
  static propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };
  state = {
    open: false,
    profileMenuOpen: false
  };

  appLinks: AppLink[] = [
    new AppLink('Market Place', '/dashboard', (<DashboardIcon/>)),
    new AppLink('Data Explorer', '/dataexplorer', (<ExploreIcon/>)),
    new AppLink('Dataset Manager', '/dataset-manager', (<CloudIcon/>)),
    new AppLink('News', '/news', (<NotificationsIcon/>))
  ];

  userAppLinks: AppLink[] = [
    new AppLink('Profie', '/profile', (<PersonIcon/>)),
    new AppLink('Order History', '/orders', <HistoryIcon/>),
    new AppLink('Message', '/message', (<MessageIcon/>))
  ];

  @autobind
  login() {
    this.props.auth.login();
  }

  @autobind
  logout() {
    this.props.auth.logout();
    //window.location.replace('/home');
  }
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleProfileMenuOpen = () => {
    this.setState({profileMenuOpen: true})
  };

  render() {
    const { classes, theme } = this.props;
    const { open } = this.state;
    const { authenticated } = this.props.auth;
    let profile = localStorage.getItem('profile');
    let profileObj = '';
    let initial = '';

    if (profile !== 'undefined' && profile != null ) {
      profileObj = JSON.parse(profile);
      if(profileObj['first_name']) {
        //@ts-ignore
        initial += profileObj.first_name[0].toUpperCase();
      }

      if(profileObj['last_name']) {
        //@ts-ignore
        initial += profileObj.last_name[0].toUpperCase();
      }
    }

    const renderProfileMenu = (
      <Menu
        anchorEl={document.getElementById('avatar')}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={this.state.profileMenuOpen}
      >
        <MenuItem>Logout</MenuItem>
      </Menu>
    );
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          className={classes.appBar}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit"  style={{ borderRight: '0.1em solid white', padding: '0.5em' }}>
              Rebloc  
            </Typography>
            {!authenticated && ( 
                <Button color="inherit" type="submit" onClick={this.login}>Login</Button> 
              )
            }
            {authenticated && ( 
              <Button color="inherit" type="submit" onClick={this.logout}>Logout</Button> 
              ) 
            }
            <div className={classes.grow}></div>
            { (profileObj !== '') && (<div className={classes.avatar} onClick={this.handleProfileMenuOpen}><ProfileAvatar initial={initial}/></div> )}
          </Toolbar>
          {renderProfileMenu}
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
              {this.appLinks.map((link, index) => (
                  <ListItem button key={link.title} onClick={this.handleDrawerClose} className="app-link">
                    <Link to={link.url}>{link.icon} <div>{link.title}</div></Link>
                  </ListItem>
              ))}
          </List>
          <Divider />
          <List>
            {this.userAppLinks.map((link, index) => (
              <ListItem button key={link.title} onClick={this.handleDrawerClose} className="app-link">
                <Link to={link.url}>{link.icon} <div>{link.title}</div></Link>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main
          className={classes.content}
        >
          <div className={classes.drawerHeader} />
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PersistentDrawerLeft);
