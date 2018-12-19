import * as React from 'react';
import { PureComponent } from 'react';
import { graphql, gql } from 'react-apollo';
import styled from 'styled-components';

const CREATE_CUSTOMER_MUTATION = gql`
  mutation CreateCustomerMutation(
    $id: Int,
    $firstName: String!
    $lastName: String!
    $primaryEmail: String!
    $secondaryEmail: String
    $roles: [String!]
    $isOrgAdmin: Boolean!
  ) {
    createCustomer ( 
                    id: $id,
                    firstName: $firstName, 
                    lastName: $lastName, 
                    primaryEmail: $primaryEmail,
                    secondaryEmail: $secondaryEmail,
                    roles: $roles,
                    isOrgAdmin: $isOrgAdmin 
                  )
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

interface Props {
  createCustomerMutation: any;
  history: any;
}

const Label = styled.span`
  width: 100px;
  display: inline-block;
  margin-left: 20px;
`;

const Field = styled.div`margin: 20px 0;`;

const Button = styled.button`margin: 20px;`;

class CreateCustomer extends PureComponent<Props> {
  state = {
    id: null,
    firstName: undefined,
    lastName: undefined,
    primaryEmail: undefined,
    secondaryEmail: undefined,
    roles: ['b'],
    isOrgAdmin: false
  };

  updateValue = (event: any) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div>
        <div>
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
            <Label>Primary Email</Label>
            <input
              value={this.state.primaryEmail}
              onChange={this.updateValue}
              name="primaryEmail"
              type="text"
              placeholder="Primary Email"
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
        </div>
        <Button onClick={() => this._createCustomer()}>Submit</Button>
    </div>
    );
  }

  _createCustomer = async () => {
    const { id, firstName, lastName, primaryEmail, secondaryEmail, roles, isOrgAdmin}  = this.state;
    const { createCustomerMutation, history } = this.props;
    await createCustomerMutation({
      variables: {
        id,
        firstName,
        lastName,
        primaryEmail,
        secondaryEmail,
        roles,
        isOrgAdmin
      }
    });
    history.push(`/`);
  };
}

export default graphql(CREATE_CUSTOMER_MUTATION, {
  name: 'createCustomerMutation'
})(CreateCustomer as any);
