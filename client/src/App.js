import React from "react";

import UserProvider from "./components/Auth/Provider";

import Layout from "./components/Layout";

import Loadable from "react-loadable";

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
        <Layout />
      </LoadableDatabaseProvider>
    </UserProvider>
  );
};

export default App;
