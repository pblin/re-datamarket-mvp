import * as React from 'react';
import PropTypes from 'prop-types';
import { Auth0Authentication } from '../../auth/Auth0Authentication';
import { Theme, withStyles, createStyles} from '@material-ui/core/styles';
import { Redirect } from 'auth0-js';
import App from '../../components/App/App';
import 'graphql-request';
import { GraphQLClient } from 'graphql-request';
import { APIKEY, GRAPHQL } from '../ConfigEnv';
import { submit } from 'redux-form';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import classNames from 'classnames';
import {connect} from "react-redux";
import CustomerForm from "./CustomerForm";
import {getProfile} from "../../store/profile/profileActions";
import {profileSelector} from "../../store/profile/profileSelector";

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
  submitProfileForm: any;
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
    address: '',
    phone: '',
    isOrgAdmin: false,
    isButtonDisabled: false,
    checkBuyer: false, 
    checkSeller: false, 
    checkValidator: false
  };
   // @ts-ignore
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  // @ts-ignore
  _createCustomer = async () => {
    const mut = 
        `mutation insert_marketplace_customer ($objects:[marketplace_customer_insert_input!]!)
        {
          insert_marketplace_customer ( 
            objects:$objects,
            on_conflict: { 
              constraint: customer_pkey, 
              update_columns: [first_name,last_name,secondary_email,address,phone,is_org_admin] 
            }
          ) {
            returning {
              id
              primary_email
              secondary_email
              first_name
              last_name
              address
              phone
              is_org_admin
            }
          }
        }
        `;

    // @ts-ignore
    const client = new GraphQLClient (GRAPHQL, {
      headers: {
        'X-Hasura-Access-Key': APIKEY,
      },
    });

    const variables = {
      objects: [
        {
          first_name: this.state.firstName,
          last_name: this.state.lastName,
          primary_email: this.state.primaryEmail,
          secondary_email: this.state.secondaryEmail,
          address: this.state.address,
          phone: this.state.phone,
          is_org_admin: this.state.isOrgAdmin
        }
      ]
     };
    this.setState({
        isButtonDisabled: true
      });
    
    let returnData = await client.request(mut, variables);
    // @ts-ignore
    localStorage.setItem('profile', JSON.stringify(returnData.insert_marketplace_customer.returning[0]));

    this.setState({
      isButtonDisabled: false
    });

  };


  componentDidMount() {
    if(!this.props.profile) {
      this.props.getProfile();
    }
  }

  handleProfileSubmit() {
    console.log('Handling profile submit');
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
                  onClick={this.props.submitProfileForm}
                  disabled={this.state.isButtonDisabled}>
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
    profile: profileSelector(state)
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    getProfile: () => dispatch(getProfile()),
    submitProfileForm: () => dispatch(submit('profile')),
  };
}

export default withStyles ( styles, { withTheme: true } ) (connect(mapStateToProps, mapDispatchToProps)(Customer));
