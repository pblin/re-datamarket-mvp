import React, { Component } from 'react';
import CreateCustomer from '../CreateCustomer/CreateCustomer';
import Profile from '../Profile/Profile';
// import { CustomerIntf } from '../Customer/Customer';
import { Auth0Authentication } from '../../auth/Auth0Authentication';

export interface DashboardProps {
  auth: Auth0Authentication;
}
export default class DashboardPage extends Component<DashboardProps, {}> {
    render () { 
        // @ts-ignore
        let profile = localStorage.getItem('profile');
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
        if (profile != null ) {
            profileObj = JSON.parse(profile);
        }

        if ( profileObj.aCustomer.id <= 0 ) {
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