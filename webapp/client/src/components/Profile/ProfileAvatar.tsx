import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from "@material-ui/icons/Person";

export interface ProfileProps {
    initial: string;
  }
class ProfileAvatar extends Component <ProfileProps, {}> {

    render () {
        if (this.props.initial !== null && this.props.initial != '') {
            return (
                <Avatar id="avatar">
                    {this.props.initial} 
                </Avatar>
            );
        } else {
            return ( 
                <Avatar id="avatar">
                   <PersonIcon/>
                </Avatar>
            );
        }
    }
}
export default ProfileAvatar;
