import React from "react";

const DatabaseContext = React.createContext({
  database: null,
  newDatabase: () => {},
  updateDatabase: () => {}
});

export default DatabaseContext;
