import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

import "typeface-roboto";

import App from "./App";

import registerServiceWorker from "./registerServiceWorker";

import UserProvider from "./components/Auth/Provider";

ReactDOM.render(<App />, document.getElementById("app"));

registerServiceWorker();
