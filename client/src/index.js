import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

import "typeface-roboto";

import App from "./App";

import registerServiceWorker from "./registerServiceWorker";

import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";

import UserProvider from "./components/Auth/Provider";

const theme = createMuiTheme({
  mixins: {
    toolbar: {
      minHeight: 48
    }
  }
});

ReactDOM.render(<App />, document.getElementById("app"));

registerServiceWorker();
