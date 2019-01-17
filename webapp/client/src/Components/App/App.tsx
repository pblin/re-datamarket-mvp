import autobind from 'autobind-decorator';
import React, { Component } from 'react';
import { Auth0Authentication } from '../../auth/Auth0Authentication';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import './App.css';

export interface AppProps {
  auth: Auth0Authentication;
}
class App extends Component<AppProps, {}> {
  @autobind
  login() {
    this.props.auth.login();
  }

  @autobind
  logout() {
    this.props.auth.logout();
  }

  render() {
    const { authenticated } = this.props.auth;

    return (
          <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" >
              Datasets
            </Typography>
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
    );
  }
}

export default App;
