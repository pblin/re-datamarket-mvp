import * as React from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Auth0Authentication } from '../../auth/Auth0Authentication';
import autobind from 'autobind-decorator';
import Button from '@material-ui/core/Button';
import ProfileAvator from '../Profile/ProfileAvator';
import { withStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';

const drawerWidth = 240;
//TODO: REPLACE LINKING WITH ROUTER LINK TAGS (PREVENT PAGE REFRESH)

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
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
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
  };

  @autobind
  login() {
    this.props.auth.login();
  }

  @autobind
  logout() {
    this.props.auth.logout();
  }
  handleDrawerOpen = () => {
    this.setState({ open: true });
  }

  handleDrawerClose = () => {
    this.setState({ open: false });
  }
  // @ts-ignore
  handleClick ( id ) {
      console.log (id.text);
      if ( id.text === 'Data Explorer' ) {
          window.location.assign( '/dataexplorer' );
      }
      if ( id.text === 'Data Sources' ) {
          window.location.assign( '/dashboard' );
      } 
      if ( id.text === 'Profile' ) {
        window.location.assign('/profile');
      }
      if ( id.text === 'Dataset Manager') {
        window.location.assign('dataset-manager');
      }

      // if (id.text === 'News') {
      //   window.location.assign( '/news');
      // }
  }
  render() {
    const { classes, theme } = this.props;
    const { open } = this.state;
    const { authenticated } = this.props.auth;
    let profile = localStorage.getItem('profile');
    let profileObj = '';
    let initial = '';

    if (profile !== 'undefined' && profile != null ) {
      profileObj = JSON.parse(profile);
      // @ts-ignore
      initial = profileObj.first_name[0].toUpperCase() + profileObj.last_name[0].toUpperCase();
    } 

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
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
            { (profileObj !== '') && (<ProfileAvator initial={initial}/> )}
            {!authenticated && ( 
                <Button color="inherit" type="submit" onClick={this.login}>Login</Button> 
              )
            }
            {authenticated && ( 
              <Button color="inherit" type="submit" onClick={this.logout}>Logout</Button> 
              ) 
            }
          </Toolbar>
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
              {['Market Place', 'Data Explorer', 'Dataset Manager', 'Data Sources', 'News'].map((text, index) => (
                  <ListItem button key={text} onClick={this.handleClick.bind(this, {text})}>
                    <ListItemText primary={text} />
                  </ListItem>
              ))}
          </List>
          <Divider />
          <List>
            {['Profile', 'Order History', 'Message'].map((text, index) => (
              <ListItem button key={text} onClick={this.handleClick.bind(this, {text})}>
                <ListItemText primary={text} />
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
