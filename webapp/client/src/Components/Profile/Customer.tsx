import * as React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
// import { createMuiTheme } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import App from '../../Components/App/App';
import { Auth0Authentication } from '../../auth/Auth0Authentication';
import { Theme, withStyles, createStyles} from '@material-ui/core/styles';
import { Redirect } from 'auth0-js';

// @ts-ignore
const styles = (theme: Theme ) => createStyles ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});
export interface CustomerIntf {
  id: number;
  first_name: string;
  last_name: string;
  primary_email: string;
  secondary_email: string;
  
  roles: string[];

  is_org_admin: boolean;
}

interface Props {
  // customer: CustomerIntf;
  classes?: any;
  theme?: any;
  // findACustomer: Function; 

  auth: Auth0Authentication;
}

class Customer extends React.Component<Props> {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };
  state = {
    firstName: '',
    lastName: '',
    primaryEmail: '',
    secondaryEmail: '',
    roles: ['', '', ''],
    isOrgAdmin: false,
    isButtonDisabled: false,
    checkBuyer: false, 
    checkSeller: false, 
    checkValidator: false
  };

  updateValue = (event: any) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }
  // @ts-ignore
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  }

  render() {
    const { classes } = this.props;

    let profile = localStorage.getItem('profile')
    let profileObj = null;

    if ( profile != null ) {
        profileObj = JSON.parse(profile);
    }
    this.state.firstName = profileObj.first_name;
    this.state.lastName = profileObj.last_name;
    this.state.primaryEmail = profileObj.primary_email;
    this.state.secondaryEmail = profileObj.secondary_email;
    this.state.isOrgAdmin = profileObj.is_org_admin;
    this.state.roles = profileObj.roles;

    if (profileObj.roles.indexOf('v') > 0) {
      this.state.checkValidator = true;
    }
    if (profileObj.roles.indexOf('b') > 0) {
      this.state.checkBuyer = true;
    }
    if (profileObj.roles.indexOf('s') > 0) {
      this.state.checkSeller = true;
    }

    console.log(this.state);
    const { authenticated } = this.props.auth;
    if ( authenticated) {
      return (
        <div> 
          <App auth={this.props.auth} {...this.props} />
          <form className={classes.container} noValidate autoComplete="off">
            <TextField
                id="outlined-name"
                label="Frist Name"
                className={classes.textField}
                value={this.state.firstName}
                onChange={this.handleChange('firstName')}
                margin="normal"
                variant="outlined"
            />
            <TextField
              id="outlined-name"
              label="Last Name"
              className={classes.textField}
              value={this.state.lastName}
              onChange={this.handleChange('lastName')}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="outlined-name"
              label="Primary Email"
              className={classes.textField}
              value={this.state.primaryEmail}
              onChange={this.handleChange('primaryEmail')}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="outlined-name"
              label="Secondary Email"
              className={classes.textField}
              value={this.state.secondaryEmail}
              onChange={this.handleChange('secondaryEmail')}
              margin="normal"
              variant="outlined"
            />
            <FormGroup row>
                <FormControlLabel
                  control={
                      <Checkbox
                          checked={this.state.checkBuyer}
                          onChange={this.handleChange('checkBuyer')}
                          value="checkBuyer"
                          color="primary"
                      />
                  }
                  label="Buyer"
                />
                <FormControlLabel
                  control={
                      <Checkbox
                            checked={this.state.checkSeller}
                            onChange={this.handleChange('checkSeller')}
                            value="checkSeller"
                            color="primary"
                      />
                  }
                  label="Seller"
                />
                <FormControlLabel
                  control={
                      <Checkbox
                            checked={this.state.checkValidator}
                            onChange={this.handleChange('checkValidator')}
                            value="checkValidator"
                            color="primary"
                      />
                  }
                  label="Validator"
                />
              </FormGroup>
          </form>
        </div>
      );
    } else {
        // @ts-ignore
        return <Redirect to = "/home" />;
    }
  }
}

export default withStyles ( styles, { withTheme: true } ) (Customer);
