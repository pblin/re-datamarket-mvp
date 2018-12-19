import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
// import { AuthConsumer } from '.../auth/authContext';
import  CreateCustomer from '../CreateCustomer/CreateCustomer';
import  Profile from '../Profile/Profile';


import { Auth0Authentication } from '../../auth/Auth0Authentication';
import { request } from 'graphql-request';

export interface DashboardProps {
  auth: Auth0Authentication;
}
export default class DashboardPage extends Component<DashboardProps, {}> {

userData = { 
    id: -1, 
    firstName: '',
    lastName: '',
    primaryEmail: '',
    secondaryEmail: '',
    roles: [' '],
    isOrgAdmin: false
};
async findUser () {
        const endpoint = 'http://localhost:9000/graphql'
        
        const query =  `
        query ($email: String!) {
            aCustomer(primaryEmail: $email) {
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
        let userEmail = localStorage.getItem('email');
        const variables = {
            email: userEmail
        };

        this.userData = await request (endpoint, query, variables);
        console.log(JSON.stringify(this.userData, undefined, 2));
      }    
render () { 
      if (this.userData == null ) {
          return (
              <div>
                <CreateCustomer />
              </div>
          )
        } else {
         return (
            <div>
                <Profile userData={this.userData} />
            </div>
         );

     }
    }
}