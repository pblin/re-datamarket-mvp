import * as React from 'react';
import { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Theme, withStyles } from '@material-ui/core';
// const classNames = require('classnames');
interface ButtonAppBarProps {
  classes?: any;
  selected?: number;
}
class ButtonAppBar extends Component<ButtonAppBarProps> {

  public render() {
      const { classes } = this.props;
      return (
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                Datasets 
              </Typography>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
        </div>
      );
  }  
}

const styles = (theme: Theme) => ({  
    root: 
    {
      flexGrow: 1,
    },
    grow: {
      flexGrow: 1,
      },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
      },
    });

export default withStyles(styles)(ButtonAppBar as any);