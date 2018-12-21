import React, { Component } from 'react';
import { CustomerIntf } from '../Customer/Customer';
export interface ProfileProps {
    userData: CustomerIntf;
  }
class Profile extends Component <ProfileProps, {}> {

    render () {
        if (this.props.userData !== undefined || this.props.userData != null ) { 
            return (
            <div>
                <h2>User Profile</h2>
                <ul>
                    <li>login Email: {this.props.userData.primaryEmail}</li>
                    <li>Name: {this.props.userData.lastName},{this.props.userData.firstName} </li>
                    <li>Secondary Email: {this.props.userData.secondaryEmail} </li>
                    <li>Action Roles: {this.props.userData.roles} </li>
                    <li>Org Admin: {(this.props.userData.isOrgAdmin).toString()} </li>
                </ul>
            </div>
            );
        } else {
            return ( 
            <div> 
                <h2>Something not right! </h2>
            </div>
            )
        }
    }
}
export default Profile;
