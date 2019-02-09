import * as React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { Auth0Authentication } from '../../auth/Auth0Authentication';
import { Theme, withStyles, createStyles} from '@material-ui/core/styles';
import { Redirect } from 'auth0-js';
import App from '../../components/App/App';
import 'graphql-request';
import { GraphQLClient } from 'graphql-request';
import { APIKEY, GRAPHQL } from '../ConfigEnv';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import autobind from 'autobind-decorator';
import classNames from 'classnames';

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

  @autobind
    async findUser () { 

        const query =  `
        query customer ($email: String ) {
            marketplace_customer (where:{primary_email:{ _eq : $email }})
            {
                id
                primary_email
                secondary_email
                first_name
                last_name
                phone
                address
                is_org_admin
            }
        }
        `;
        // @ts-ignore
        const client = new GraphQLClient (GRAPHQL, {
            headers: {
            'X-Hasura-Access-Key': APIKEY,
            },
        });

        let userEmail = localStorage.getItem('email');
        const variables = {
            email: userEmail
        };
        // @ts-ignore
        let result = await client.request (query, variables);
        // @ts-ignore
        localStorage.setItem ('profile', JSON.stringify(result.marketplace_customer[0]));
        this.forceUpdate();
    } 
  // @ts-ignore
  _createCustomer = async () => {

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

  }

  componentDidMount() {
    const { authenticated } = this.props.auth;
    if ( authenticated) {

      this.findUser();
      let profile = localStorage.getItem('profile');
      let profileObj = {
        id: -1,
        first_name: '',
        last_name: '',
        primary_email: '',
        secondary_email: '',
        phone: '',
        address: '',
        is_org_admin: false
      };
      if (profile !== 'undefined' && profile !== null ) {
        profileObj = JSON.parse(profile);
        this.setState ( 
            { firstName: profileObj.first_name,
              lastName: profileObj.last_name,
              primaryEmail: profileObj.primary_email,
              secondaryEmail: profileObj.secondary_email,
              phone: profileObj.phone,
              address: profileObj.address,
              isOrgAdmin: profileObj.is_org_admin
            }
        );
        // console.log(profileObj);
      }
    }
  }

  render() {
    const { classes } = this.props;
    const { authenticated } = this.props.auth;
    if ( authenticated) {
      return (

        <div> 
          <App auth={this.props.auth} />
          <form className={classes.container} noValidate autoComplete="off">
            <div>
              <Grid container spacing={24}>
                <Grid item xs={6}>
                  <TextField 
                      id="outlined-name"
                      label="First Name (Required)"
                      className={classes.textField}
                      value={this.state.firstName}
                      onChange={this.handleChange('firstName')}
                      margin="normal"
                      fullWidth
                      variant="outlined"
                  />
                </Grid>
                <Grid item  xs={6}>
                  <TextField
                    id="outlined-name"
                    label="Last Name (Required)"
                    className={classes.textField}
                    value={this.state.lastName}
                    onChange={this.handleChange('lastName')}
                    margin="normal"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="outlined-disabled"
                    label="Primary Email"
                    className={classes.textField}
                    value={this.state.primaryEmail}
                    margin="normal"
                    disabled
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="outlined-name"
                    label="Secondary Email"
                    className={classes.textField}
                    value={this.state.secondaryEmail}
                    onChange={this.handleChange('secondaryEmail')}
                    margin="normal"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="outlined-name"
                    label="Phone"
                    className={classes.textField}
                    value={this.state.phone}
                    onChange={this.handleChange('phone')}
                    margin="normal"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-name"
                    label="Full Address"
                    className={classes.textField}
                    value={this.state.address}
                    onChange={this.handleChange('address')}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </div>
          </form>
          <Button color="primary" className={classes.button} 
                  onClick={() => this._createCustomer()} 
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

export default withStyles ( styles, { withTheme: true } ) (Customer);
