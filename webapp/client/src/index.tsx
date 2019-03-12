import {AppStore} from './store/AppStore';
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Routes from './utils/Routes';
import {Provider} from "react-redux";
import './index.css';
import 'typeface-roboto';
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Roboto",
    useNextVariants: true
  },
  overrides: {
    MuiAvatar: {
    }
  },
  palette: {
    primary: {
      main: '#47494D',
      light: '#6B6D70',
      dark: '#313335',
      contrastText: '#FFF'
    },
    secondary: {
      main: '#6996B6',
      light: '#87ABC4',
      dark: '#49697F',
      contrastText: '#FFF'
    },
  }
});

//Initialize the store
const app = AppStore.getInstance();
app.initialize();

ReactDOM.render(
  <Provider store={app.store}>
    <MuiThemeProvider theme={theme}>
      <Routes />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root') as HTMLElement);
registerServiceWorker();
