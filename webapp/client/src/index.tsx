import {AppStore} from './store/AppStore';
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Routes from './utils/Routes';
import {Provider} from "react-redux";
import './index.css';

//Initialize the store
const app = AppStore.getInstance();
app.initialize();

ReactDOM.render(
  <Provider store={app.store}>
    <Routes />
  </Provider>,
  document.getElementById('root') as HTMLElement);
registerServiceWorker();
