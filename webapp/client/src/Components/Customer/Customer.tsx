import * as React from 'react';
import styled from 'styled-components';

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
        <Cell>{customer.first_name}</Cell>
        <Cell>{customer.last_name}</Cell>
        <Cell>{customer.primary_email}</Cell>
        <Cell>{customer.primary_email}</Cell>
        <Cell>{customer.roles}</Cell>
        <Cell>{customer.is_org_admin}</Cell>
      </tr>
    );
  }
}

export default Customer;
