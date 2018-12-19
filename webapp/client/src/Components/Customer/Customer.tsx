import * as React from 'react';
import styled from 'styled-components';

export interface CustomerIntf {
  id: number;
  firstName: string;
  lastName: string;
  primaryEmail: string;
  secondaryEmail: string;
  
  roles: string[];
  
  isOrgAdmin: boolean;
}

interface Props {
  customer: CustomerIntf;
  // findACustomer: Function; 

}

const Cell = styled.td`
  padding: 10px 30px;
  text-align: center;
`;

class Customer extends React.Component<Props> {

/*
  findACustomer = () => {
    const { customer: {primaryEmail}, findACustomer } = this.props;
    findACustomer (primaryEmail);
  }
*/

  render() {
    const { customer } = this.props;
    return (
      <tr>
        <Cell>{customer.firstName}</Cell>
        <Cell>{customer.lastName}</Cell>
        <Cell>{customer.primaryEmail}</Cell>
        <Cell>{customer.secondaryEmail}</Cell>
        <Cell>{customer.roles}</Cell>
        <Cell>{customer.isOrgAdmin}</Cell>
      </tr>
    );
  }
}

export default Customer;
