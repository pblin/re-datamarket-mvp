import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  Divider,
  IconButton,
  ListItem,
  withStyles,
  Theme,
} from "@material-ui/core";

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import { Auth0Authentication } from '../../auth/Auth0Authentication';
import {bindActionCreators} from "redux";
import autobind from 'autobind-decorator';
import {Link} from "react-router-dom";
import {AppLink} from "./AppLink";
import Logo from '../../img/rebloc_logo.svg';
import ProfileAvatar from '../Profile/ProfileAvatar';
import "./App.scss";

//Icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ExploreIcon from "@material-ui/icons/Explore";
import ProfileMenu from "./ProfileMenu";
import {updateProfileMenuOpen} from "../../store/app/appActions";
import {appSelector} from "../../store/app/appSelector";
import {getProfile} from "../../store/profile/profileActions";
import {profileSelector} from "../../store/profile/profileSelector";

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
    background: '#47494d'
  },
  marginLeft50: {
    marginLeft: "50px"
  },
  appLogo: {
    height: '26px'
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
  profileMenuOpen: boolean;
  profile: any;
  actions: any;
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
    new AppLink('Marketplace', '/marketplace', (<DashboardIcon/>)),
    new AppLink('Data Explorer', '/dataexplorer', (<ExploreIcon/>)),
    new AppLink('News', 'https://medium.com/rebloc', (<NotificationsIcon/>), 'global'),
    new AppLink('Order History', '/order/history', <CreditCardIcon/>)
  ];

  userAppLinks: AppLink[] = [
    new AppLink('Profie', '/profile', (<PersonIcon/>)),
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
    this.props.actions.updateProfileMenuOpen(true);
  };

  componentDidMount(): void {
    if(!this.props.profile) {
      this.props.actions.getProfile();
    }
  }

  @autobind
  handleProfileMenuClickAway(itemPressed) {
    switch(itemPressed) {
      case 'clickAway':
        this.props.actions.updateProfileMenuOpen(false);
        break;
      case 'logout':
        this.logout();
        this.props.actions.updateProfileMenuOpen(false);
        break;
      case 'profile':
        this.props.actions.updateProfileMenuOpen(false);
        break;
    }
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

    return (
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            className={classes.appBar}
            position={"static"}
          >
            <Toolbar disableGutters={!open}>
              {authenticated && (<IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>)}
              <Link to={"/home"}><img src={Logo} className={classes.appLogo + ' ' + (authenticated ? '': classes.marginLeft50)}/></Link>
              <div className={classes.grow}></div>
              { (profileObj !== '' && authenticated) && (<div className={classes.avatar} onClick={this.handleProfileMenuOpen}><ProfileAvatar initial={initial}/></div> )}
            </Toolbar>
            <ProfileMenu
              open={this.props.profileMenuOpen}
              onClickAway={this.handleProfileMenuClickAway}
              profile={profileObj}/>
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
                    <>
                      {link.type == 'app' &&
                          <ListItem button key={`link-item${index}`} onClick={this.handleDrawerClose} className="app-link">
                            <Link to={link.url}>{link.icon} <div>{link.title}</div></Link>
                          </ListItem>
                      }
                      {link.type == 'global' &&
                      <ListItem button key={`link-item${index}`} onClick={this.handleDrawerClose} className="app-link">
                        <a href={link.url}>{link.icon} <div>{link.title}</div></a>
                      </ListItem>
                      }
                    </>
                ))}
            </List>
            <Divider />
            <List>
              {this.userAppLinks.map((link, index) => (
                <ListItem button key={`link-item-user${index}`} onClick={this.handleDrawerClose} className="app-link">
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

function mapStateToProps (state: any) {
  return {
    profileMenuOpen: appSelector(state).profileMenuOpen,
    profile: profileSelector(state)
  };
};

function mapDispatchToProps(dispatch: any) {
  return {
    actions: bindActionCreators({
      getProfile,
      updateProfileMenuOpen
    }, dispatch)
  }
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(PersistentDrawerLeft));

