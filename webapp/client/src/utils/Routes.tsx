import React, { SFC } from 'react';
import { Callback, DashboardPage, Customer } from '../components';
import Home from '../pages/Home';
import DataMap from '../pages/DatasetExplorer';
import { Route, RouteComponentProps } from 'react-router';
import { Router } from 'react-router-dom';
import { WebAuthentication } from '../auth/WebAuthentication';
import history from './history';
import DatasetManager from "../components/DatasetManager/DatasetManager";
import App from '../components/App/App';
const auth = new WebAuthentication();

const handleAuthentication = (props: RouteComponentProps<{}>) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

const Routes: SFC<{}> = () => {
  return (
    <div>
      <Router history={history}>
        <div>
          <App auth={auth}/>
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
              path="/dataexplorer"
              render={(props) => <DataMap auth={auth} />}
            />
            <Route
              path="/profile"
              render={(props) => <Customer auth={auth} {...props} />}
            />
            <Route path="/dataset-manager"
              render = {(props) => <DatasetManager auth={auth} {...props}/>}
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
    </div>
  );
};
export default Routes;
