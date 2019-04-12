import {AppStore} from './store/AppStore';
import React from 'react';
import ReactDOM from 'react-dom';
//import registerServiceWorker from './registerServiceWorker';
import Routes from './utils/Routes';
import {Provider} from "react-redux";
import './index.css';
import 'typeface-roboto';
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core/styles";
import {SnackbarProvider} from "notistack";
import {AppEventEmitter} from "./utils/AppEventEmitter";
import registerServiceWorker, {unregister} from "./registerServiceWorker";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Roboto",
    useNextVariants: true
  },
  overrides: {
    MuiStepIcon: {
      active: {
        color: '#6996B6 !important'
      }
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

class AppBootstrap extends React.Component {
  constructor(props) {
    super(props);
    AppEventEmitter.getInstance().on('authenticated', () => {
      //Need to force re-render on authentication, or routes wont work correctly
      this.forceUpdate();
    });
  }

  render() {
    return (
      <SnackbarProvider maxSnack={3} anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}>
        <Provider store={app.store}>
          <MuiThemeProvider theme={theme}>
              <Routes />
          </MuiThemeProvider>
        </Provider>
      </SnackbarProvider>
    )
  }
}

ReactDOM.render(
  <AppBootstrap />
  ,
  document.getElementById('root') as HTMLElement);

  unregister();
console.log('CURRENT ENV');
console.log(process.env.NODE_ENV);
console.log(process.env.HTTP_API_URL);

if(process.env.NODE_ENV == 'production') {
  registerServiceWorker();
} else {
  unregister();
}
