import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import 'typeface-roboto';

import App from './App';

import registerServiceWorker from './registerServiceWorker';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme({
  mixins: {
    toolbar: {
      minHeight: 48,
    }
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>, 
  document.getElementById('app')
);

registerServiceWorker();
