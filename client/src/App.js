import React, { Component } from "react";

import UserProvider from "./components/Auth/Provider";
import DatabaseProvider from "./components/Database/Provider";

import Layout from "./components/Layout";

class App extends Component {
  render() {
    return (
      <UserProvider>
        <DatabaseProvider>
          <Layout />
        </DatabaseProvider>
      </UserProvider>
    );
  }
}

export default App;
