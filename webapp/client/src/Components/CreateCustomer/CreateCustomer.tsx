import * as React from 'react';
import { PureComponent } from 'react';
// import { graphql, gql } from 'react-apollo';
import 'graphql-request';
import styled from 'styled-components';
// import { request } from 'graphql-request';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { GraphQLClient } from 'graphql-request';
import { APIKEY, GRAPHQL } from '../Config';
// import { element } from 'prop-types';

const mut = 
`mutation insert_marketplace_customer ($objects:[marketplace_customer_insert_input!]!)
 {
  insert_marketplace_customer ( 
    objects:$objects
  ) {
    returning {
      id
      primary_email
      secondary_email
      first_name
      last_name
      roles
      is_org_admin
    }
  }
} 
`;

const Label = styled.span`
  width: 100px;
  display: inline-block;
  margin-left: 20px;
`;

const Field = styled.div`margin: 20px 0;`;

// const Button = styled.button`margin: 20px;`;

class CreateCustomer extends PureComponent {

  state = {
    id: -1,
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

  // @ts-ignore
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
    return (
      <div>
        <div>
          <h1>Please Sign up!</h1>
          <p/>
          <Field>
              <Label>First Name</Label>
                <input
                  value={this.state.firstName}
                  onChange={this.updateValue}
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                />
          </Field>
          <Field>
              <Label>Last Name</Label>
              <input
                value={this.state.lastName}
                onChange={this.updateValue}
                name="lastName"
                type="text"
                placeholder="Last Name"
              />
          </Field>
          <Field>
              <Label>Secondary Email</Label>
              <input
                value={this.state.secondaryEmail}
                onChange={this.updateValue}
                name="secondaryEmail"
                type="text"
                placeholder="Seconcary Email"
              />
          </Field> 
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
        </div>
          <button onClick={() => this._createCustomer()} disabled={this.state.isButtonDisabled}>
          Submit</button>
      </div>
  );
}

 _createCustomer = async () => {

    let primaryEmail = localStorage.getItem('email');
    // const endpoint = 'http://localhost:8080/v1alpha1/graphql';

    // let endpoint = 'http://localhost:8081/v1alpha1/graphql';
    let endpoint = 'http://demo-app.rebloc.io:8081/v1alpha1/graphql';

    if (GRAPHQL !== undefined) {
      endpoint = GRAPHQL;
    }
    let apiKey = '3b177bc7c2484aba11a5277f5ce3aa3b884bbd19660e2a452eb1f593d9cf2587';
    if (APIKEY !== undefined ) {
         apiKey = APIKEY;
    }

    const client = new GraphQLClient (endpoint, {
      headers: {
        'X-Hasura-Access-Key': apiKey,
      },
    });

    if (this.state.checkBuyer) { 
      this.state.roles[0] = 'b';
    } else {
      this.state.roles[0] = '';
    }

    if (this.state.checkSeller) { 
      this.state.roles[1] = 's';
    } else {
      this.state.roles[1] = '';
    }

    if (this.state.checkValidator) { 
      this.state.roles[2] = 'v';
    } else {
      this.state.roles[2] = '';
    }
    let savedRoles = this.state.roles;
    let quote = '\'';
    savedRoles = savedRoles.map ( x => { return quote + x + quote; } );
    const roleStr = '{' + savedRoles[0] + ',' +
                     quote + savedRoles[1] + quote + ',' +
                     quote + savedRoles[2] + quote +
                     '}';
    const variables = {
      objects: [
        {
          first_name: this.state.firstName,
          last_name: this.state.lastName,
          primary_email: primaryEmail,
          secondary_email: this.state.secondaryEmail,
          roles: roleStr,
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
    window.location.replace('/home');

    // this.setState({
    //   isButtonDisabled: false
    // });
  }
}

export default CreateCustomer;