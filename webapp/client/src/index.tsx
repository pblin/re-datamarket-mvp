import {AppStore} from './store/AppStore';
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Routes from './utils/Routes';
import {Provider} from "react-redux";
//import App from './components/App/App';
import './index.css';
//import {WebAuthentication} from "./auth/WebAuthentication";
//import {RouteComponentProps} from "react-router";

//const auth = new WebAuthentication();

//const handleAuthentication = (props: RouteComponentProps<{}>) => {
//  if (/access_token|id_token|error/.test(location.hash)) {
//    auth.handleAuthentication();
//  }
//};

//Initialize the store
const app = AppStore.getInstance();
app.initialize();

ReactDOM.render(
  <Provider store={app.store}>
    <Routes />
  </Provider>,
  document.getElementById('root') as HTMLElement);
registerServiceWorker();
