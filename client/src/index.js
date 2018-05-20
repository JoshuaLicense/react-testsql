import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

import "typeface-roboto";

import App from "./App";

import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<App />, document.getElementById("app"));

registerServiceWorker();
