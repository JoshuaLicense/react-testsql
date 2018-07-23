import React, { Component } from "react";

import UserProvider from "./components/Auth/Provider";

import Layout from "./components/Layout";

import Loadable from "react-loadable";

// Code splitting as sql.js is big! Load the Database provider dynamically
const LoadableDatabaseProvider = Loadable({
  loader: () =>
    import("./components/Database/Provider" /* webpackChunkName: "database" */),
  loading: () => <div>Loading...</div>
});

class App extends Component {
  render() {
    return (
      <UserProvider>
        <LoadableDatabaseProvider>
          <Layout />
        </LoadableDatabaseProvider>
      </UserProvider>
    );
  }
}

export default App;
