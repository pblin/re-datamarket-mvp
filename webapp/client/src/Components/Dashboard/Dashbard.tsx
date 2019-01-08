import React, { Component } from 'react';
import CreateCustomer from '../CreateCustomer/CreateCustomer';
import Profile from '../Profile/Profile';
// import { CustomerIntf } from '../Customer/Customer';
import { Auth0Authentication } from '../../auth/Auth0Authentication';
// import { request } from 'graphql-request';
import { GraphQLClient } from 'graphql-request';
import autobind from 'autobind-decorator';
import { APIKEY, GRAPHQL } from '../Config';

export interface DashboardProps {
  auth: Auth0Authentication;
}
export default class DashboardPage extends Component<DashboardProps, {}> {
    // state = {
    //     needToRegister: 'false'
    // };

    @autobind
    async findUser () { 
        // const endpoint = 'http://localhost:9000/graphql';
        // let endpoint = 'http://localhost:8081/v1alpha1/graphql';
        let endpoint = 'http://demo-app.rebloc.io:8081/v1alpha1/graphql';
        
        if (GRAPHQL !== undefined) {
            endpoint = GRAPHQL;
        }
        let apiKey = '3b177bc7c2484aba11a5277f5ce3aa3b884bbd19660e2a452eb1f593d9cf2587';
        if (APIKEY !== undefined ) {
            apiKey= APIKEY;
        }

        const query =  `
        query customer ($email: String ) {
            marketplace_customer (where:{primary_email:{ _eq : $email }})
            {
                id
                primary_email
                secondary_email
                first_name
                last_name
                roles
                is_org_admin
            }
        }
        `;
        const client = new GraphQLClient (endpoint, {
            headers: {
            'X-Hasura-Access-Key': apiKey,
            },
        });

        let userEmail = localStorage.getItem('email');
        const variables = {
            email: userEmail
        };
        // @ts-ignore
      
        localStorage.setItem('pendingProfileQuery', 'y');
        let result = await client.request (query, variables);
        
        // @ts-ignore
        localStorage.setItem ('profile', JSON.stringify(result.marketplace_customer[0]));
        localStorage.setItem('pendingProfileQuery', 'n');
        this.forceUpdate();
    } 
  
    render () { 
        let profileObj = null;

        let profile = localStorage.getItem('profile');
        let isFindUserPending = localStorage.getItem('pendingProfileQuery');
        if ( (profile == null ) && (isFindUserPending === 'n' || isFindUserPending == null)) {
                this.findUser();
        }
        
        if (profile !== 'undefined' && profile != null ) {
            profileObj = JSON.parse(profile);
        }
        if (isFindUserPending === 'y' ) { 
            return ( 
                <div>
                    <h3> One Moment ... </h3>
                </div>
            );
        } else { 
            if ( profile === 'undefined' || profileObj == null ) {
                return (
                    <div>
                        <CreateCustomer />
                    </div>
                );
                } else {
                    return (
                        <div>
                            <Profile userData={profileObj}/>
                        </div>
                    );
            }
        }
    }
}