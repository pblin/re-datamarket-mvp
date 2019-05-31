import React, { SFC } from 'react';
import { Callback, DashboardPage, Customer } from '../components';
import Home from '../pages/Home';
import DataMap from '../pages/DatasetExplorer';
import { Route, RouteComponentProps, Redirect } from 'react-router';
import { Router } from 'react-router-dom';
import { WebAuthentication } from '../auth/WebAuthentication';
import history from './history';
import DatasetManager from "../components/DatasetManager/DatasetManager";
import MarketplaceV2 from "../components/Marketplace/MarketplaceV2";
import App from '../components/App/App';
import DatasetInfo from "../components/DatasetInfo/DatasetInfo";
import OrderHistoryPage from "../components/OrderHistory/OrderHistoryPage";
import EmailVerificationPage from "../components/EmailVerification/EmailVerificationPage";

const auth = new WebAuthentication();

const handleAuthentication = (props: RouteComponentProps<{}>) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

const PrivateRoute = ({component: Component, authenticated, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === true
        ? <Component {...props} auth={rest.auth}/>
        : <Redirect to={{pathname: '/home', state: {from: props.location}}} />}
    />
  )
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
            <PrivateRoute
              path="/dashboard"
              component={DashboardPage}
              auth={auth}
              authenticated={auth.authenticated}
            />
            <PrivateRoute
              path="/dataexplorer"
              component={DataMap}
              auth={auth}
              authenticated={auth.authenticated}
            />
            <PrivateRoute
              path="/profile"
              component={Customer}
              auth={auth}
              authenticated={auth.authenticated}
            />
            <PrivateRoute
              path="/dataset-manager"
              component={DatasetManager}
              auth={auth}
              authenticated={auth.authenticated}
            />
            <PrivateRoute
              path="/marketplace"
              component={MarketplaceV2}
              auth={auth}
              authenticated={auth.authenticated}
            />
            <PrivateRoute
              path="/dataset/:id"
              component={DatasetInfo}
              auth={auth}
              authenticated={auth.authenticated}
            />
            <PrivateRoute
              path="/order/history"
              component={OrderHistoryPage}
              auth={auth}
              authenticated={auth.authenticated}
            />
            <Route
              path="/VerificationPage"
              component={EmailVerificationPage}
              auth={auth}
              authenticated={auth.authenticated}
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
