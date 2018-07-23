import React from "react";

const DatabaseContext = React.createContext({
  database: null,
  loadDatabase: () => {}
});

export default DatabaseContext;
