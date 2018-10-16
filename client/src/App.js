import React from "react";

import UserProvider from "./components/Auth/Provider";

import Layout from "./components/Layout";

import Loadable from "react-loadable";
import CssBaseline from "@material-ui/core/CssBaseline";
//import SQL from "sql.js";
// Code splitting as sql.js is big! Load the Database provider dynamically
const LoadableDatabaseProvider = Loadable({
  loader: () =>
    import("./components/Database/Provider" /* webpackChunkName: "database" */),
  loading: () => <div>Loading...</div>
});

const App = () => {
  return (
    <UserProvider>
      <LoadableDatabaseProvider>
        <CssBaseline />
        <Layout />
      </LoadableDatabaseProvider>
    </UserProvider>
  );
};

export default App;
