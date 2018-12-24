import * as React from 'react';
import { PureComponent } from 'react';
// import { graphql, gql } from 'react-apollo';
import 'graphql-request';
import styled from 'styled-components';
import { request } from 'graphql-request';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const mut = `mutation 
        createCustomerMutation (
        $id: Int,
        $firstName: String!, 
        $lastName: String!, 
        $primaryEmail: String!, 
        $secondaryEmail: String,
        $roles: [String],
        $isOrgAdmin: Boolean)
        {
        createCustomer(id: $id, 
                      firstName: $firstName, 
                      lastName: $lastName, 
                      primaryEmail: $primaryEmail, 
                      secondaryEmail: $secondaryEmail, 
                      roles: $roles, 
                      isOrgAdmin: $isOrgAdmin)
          {
            id
            firstName
            lastName
            primaryEmail
            secondaryEmail
            roles
            isOrgAdmin
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
                        checked={this.state.checkValidator}
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
    const endpoint = 'http://localhost:9000/graphql';

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
    const variables = {
        id: this.state.id,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        primaryEmail: primaryEmail,
        secondaryEmail: this.state.secondaryEmail,
        roles: this.state.roles,
        isOrgAdmin: this.state.isOrgAdmin
     };

    this.setState({
        isButtonDisabled: true
      });
    await request (endpoint, mut, variables);
    const profile = {
        aCustomer: variables
    };
    localStorage.setItem('profile', JSON.stringify(profile));
    window.location.replace('/home');

    // this.setState({
    //   isButtonDisabled: false
    // });
  }
}

export default CreateCustomer;