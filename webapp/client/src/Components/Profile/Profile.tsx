import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
export interface ProfileProps {
    userData: { 
                id: -1,
                primary_email: '',
                secondary_email: '',
                last_name: '',
                first_name: '',
                is_org_admin: '',
                roles: ['']
    };
  }
class Profile extends Component <ProfileProps, {}> {

    render () {
        if (this.props.userData !== undefined || this.props.userData != null ) { 
            return (
            <div>
                    <Typography color="primary" variant="headline" align="center">
                        <Avatar>
                            {this.props.userData.first_name[0].toUpperCase()} 
                            {this.props.userData.last_name[0].toUpperCase()}
                        </Avatar>
                        Hi! {this.props.userData.first_name}, Welcome to Rebloc
                    </Typography>
                    {/* <Typography variant="subtitle2" align="center">
                         {this.props.userData.primary_email}
                    </Typography> */}
            </div>
            );
        } else {
            return ( 
            <div> 
                <Typography variant="title"> 
                    Hmmm, Something not right... 
                </Typography>
            </div>
            );
        }
    }
}
export default Profile;
