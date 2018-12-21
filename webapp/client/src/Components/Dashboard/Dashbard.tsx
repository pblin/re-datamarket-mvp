import React, { Component } from 'react';
import CreateCustomer from '../CreateCustomer/CreateCustomer';
import Profile from '../Profile/Profile';
// import { CustomerIntf } from '../Customer/Customer';
import { Auth0Authentication } from '../../auth/Auth0Authentication';
import { request } from 'graphql-request';
import autobind from 'autobind-decorator';
export interface DashboardProps {
  auth: Auth0Authentication;
}
export default class DashboardPage extends Component<DashboardProps, {}> {
    @autobind
    async findUser () { 
      const endpoint = 'http://localhost:9000/graphql';
      
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
  
      let profile = localStorage.getItem ('profile');
      const variables = {
          email: userEmail
      };
      // @ts-ignore
      if ( profile == null || profile.id <= 0 ) {
          localStorage.setItem('pendingProfileQuery', 'y');
          let result = await request (endpoint, query, variables);
          localStorage.setItem ('profile', JSON.stringify(result));
          localStorage.setItem('pendingProfileQuery', 'n');
          window.location.replace('/home');
      }
    } 
  
    render () { 
        let profileObj = {
            aCustomer: 
            {
                    id: -1,
                    firstName: '',
                    lastName: '',
                    primaryEmail: '',
                    secondaryEmail: '',
                    roles: ['b'],
                    isOrgAdmin: false
            }
        };
        let profile = localStorage.getItem('profile');
        let isFindUserPending = localStorage.getItem('pendingProfileQuery');
        if ( (profile == null ) && isFindUserPending === 'n' ) {
                this.findUser();
        }
        
        if (profile != null ) {
            profileObj = JSON.parse(profile);
        }
        if (isFindUserPending === 'y' ) { 
            return ( 
                <div>
                    <h3> One Moment ... </h3>
                </div>
            );
        } else { 
            if ( profile == null || profileObj.aCustomer.primaryEmail ===  '' ) {
                return (
                    <div>
                        <CreateCustomer />
                    </div>
                );
                } else {
                    return (
                        <div>
                            <Profile userData={profileObj.aCustomer}/>
                        </div>
                    );
            }
        }
    }
}