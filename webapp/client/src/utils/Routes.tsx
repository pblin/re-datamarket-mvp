import React, { SFC } from 'react';
import { Callback, DashboardPage } from '../Components';
import Home from '../pages/Home';
import { Route, RouteComponentProps } from 'react-router';
import { Router } from 'react-router-dom';
import { WebAuthentication } from '../auth/WebAuthentication';
import history from './history';

const auth = new WebAuthentication();

const handleAuthentication = (props: RouteComponentProps<{}>) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

const Routes: SFC<{}> = () => {
  return (
    <Router history={history}>
      <div>
        <Route path="/" exact={true} render={props => <Home auth={auth} {...props} />} />
        <main role="main">
          <Route
            path="/home"
            render={(props) => <Home auth={auth} {...props} />}
          />
          <Route
            path="/dashboard" 
            render={(props) => <DashboardPage auth={auth} {...props} />}
          />
          <Route
            path="/callback"
            render={ (props) => {
              handleAuthentication(props);
              return <Callback {...props} />;
            }}
          />
        </main>
      </div>
    </Router>
  );
};
export default Routes;
