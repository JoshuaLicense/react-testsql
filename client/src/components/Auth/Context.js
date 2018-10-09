import React from "react";

const UserContext = React.createContext({
  user: null,
  login: user => {},
  refresh: () => {},
  logout: () => {}
});

export default UserContext;
