import React from "react";

const UserContext = React.createContext({
  user: null,
  login: (username, password) => {},
  logout: () => {},
  refresh: () => {}
});

export default UserContext;
