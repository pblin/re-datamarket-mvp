import autobind from 'autobind-decorator';
import React, { Component } from 'react';
import { Auth0Authentication } from '..//auth/Auth0Authentication';
import DashboardPage  from '../Components/Dashboard/Dashbard';
import App from '../Components/App/App';
export interface HomeProps {
  auth: Auth0Authentication;
}
export default class Home extends Component<HomeProps, {}> {
  @autobind
  login() {
    this.props.auth.login();
  }
  @autobind
  logout() {
    this.props.auth.logout();
  }
  render() {
    const { authenticated } = this.props.auth;
   
    return (
      <div className="jumbotron">
        {authenticated && (
          <div className="container">
            <App auth={this.props.auth} {...this.props} />
            <div>
              <DashboardPage auth={this.props.auth} {...this.props}/>
            </div>
          </div>
        )}
        {!authenticated && (
          <div className="container">
           <App auth={this.props.auth} {...this.props} />
          </div>
        )}
      </div>
    );
  }
}
