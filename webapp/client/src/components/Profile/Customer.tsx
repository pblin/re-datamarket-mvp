import * as React from 'react';
import PropTypes from 'prop-types';
import { Auth0Authentication } from '../../auth/Auth0Authentication';
import { Theme, withStyles, createStyles} from '@material-ui/core/styles';
import { Redirect } from 'auth0-js';
import App from '../../components/App/App';
import 'graphql-request';
import { submit } from 'redux-form';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import classNames from 'classnames';
import {connect} from "react-redux";
import CustomerForm from "./CustomerForm";
import {getProfile, updateProfile} from "../../store/profile/profileActions";
import {emailSelector, profileSelector} from "../../store/profile/profileSelector";

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
  phone: string,
  address: string,
  is_org_admin: boolean;
}

interface Props {
  // customer: CustomerIntf;
  classes?: any;
  theme?: any;
  // findACustomer: Function; 
  auth: Auth0Authentication;
  getProfile: any;
  profile: any;
  email: string;
  submitProfileForm: any;
  updateProfile: any;
}

class Customer extends React.Component<Props> {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };

  constructor(props: any) {
    super(props);
    this.handleProfileSubmit = this.handleProfileSubmit.bind(this);
  }

  componentDidMount() {
    if(!this.props.profile) {
      this.props.getProfile();
    }
  }

  handleProfileSubmit(values) {
    console.log('Handling profile submit');
    console.log(values);
    this.props.updateProfile(this.props.email, values);
  }

  render() {
    const { classes } = this.props;
    const { authenticated } = this.props.auth;
    if ( authenticated) {
      return (

        <div> 
          <App auth={this.props.auth} />
          <CustomerForm onSubmit={this.handleProfileSubmit}/>
          <Button color="primary" className={classes.button}
                  onClick={this.props.submitProfileForm}>
              <SaveIcon className={classNames(classes.leftIcon, classes.iconLarge)} />
              Save
          </Button>
        </div>
      );
    } else {
        // @ts-ignore
        return <Redirect to = "/home" />;
    }
  }
}

function mapStateToProps(state: any, ownProps: any) {
  return {
    profile: profileSelector(state),
    email: emailSelector(state)
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    getProfile: () => dispatch(getProfile()),
    updateProfile: (email, profile) => dispatch(updateProfile(email, profile)),
    submitProfileForm: () => dispatch(submit('profile')),
  };
}

export default withStyles ( styles, { withTheme: true } ) (connect(mapStateToProps, mapDispatchToProps)(Customer));
