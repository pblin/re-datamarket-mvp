import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

export interface ProfileProps {
    initial: string;
  }
class ProfileAvatar extends Component <ProfileProps, {}> {

    render () {
        if (this.props.initial !== null) { 
            return (
                <Avatar>
                    {this.props.initial} 
                </Avatar>
            );
        } else {
            return ( 
                <Typography variant="title"> 
                    No Profile Registered.
                </Typography>
            );
        }
    }
}
export default ProfileAvatar;
