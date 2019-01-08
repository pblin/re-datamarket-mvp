import React, { Component } from 'react';
export interface ProfileProps {
    userData: { 
                id: -1,
                primary_email: '',
                secondary_email: '',
                last_name: '',
                first_name: '',
                is_org_admin: '',
                roles: ['']
    }
  }
class Profile extends Component <ProfileProps, {}> {

    render () {
        if (this.props.userData !== undefined || this.props.userData != null ) { 
            return (
            <div>
                <h2>User Profile</h2>
                <ul>
                    <li>login Email: 
                        {this.props.userData.primary_email}</li>
                    <li>Name: 
                        {this.props.userData.last_name}, 
                        {this.props.userData.first_name} </li>
                    
                    <li>Secondary Email: 
                        {this.props.userData.secondary_email} </li>
                    <li>Action Roles: 
                        {this.props.userData.roles.toString()} </li>
                    <li>Org Admin: 
                        {this.props.userData.is_org_admin.toString()} </li>
                </ul>
            </div>
            );
        } else {
            return ( 
            <div> 
                <h2>Something not right! </h2>
            </div>
            );
        }
    }
}
export default Profile;
