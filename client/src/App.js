import React, { Suspense } from "react";

import UserProvider from "./components/Auth/Provider";

import Layout from "./components/Layout";

import CssBaseline from "@material-ui/core/CssBaseline";

const LoadableDatabaseProvider = React.lazy(() =>
  import("./components/Database/Provider" /* webpackChunkName: "database" */)
);

const App = () => {
  return (
    <UserProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <LoadableDatabaseProvider>
          <CssBaseline />
          <Layout />
        </LoadableDatabaseProvider>
      </Suspense>
    </UserProvider>
  );
};

export default App;
