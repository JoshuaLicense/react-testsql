import React from "react";

const UserContext = React.createContext({
  user: null,
  login: (username, password) => {},
  logout: () => {},
  refresh: () => {}
});

/*
export const withUserContext = Component => props => (
  <UserContext.Consumer>
    {user => <Component {...props} user={user} />}
  </UserContext.Consumer>
);*/

export function withUserContext(Component) {
  return function withUserContext2(props) {
    return (
      <UserContext.Consumer>
        {user => <Component {...props} user={user} />}
      </UserContext.Consumer>
    );
  };
}

export default UserContext;
