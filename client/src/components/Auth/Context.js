import React from "react";

const UserContext = React.createContext({
  user: null,
  logout: () => {},
  refresh: () => {}
});

export default UserContext;
