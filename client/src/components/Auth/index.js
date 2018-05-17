import React from "react";
//import PropTypes from 'prop-types';

import api from "../../utils/api";

import Guest from "./Guest";
import LoggedIn from "./LoggedIn";

class Auth extends React.Component {
  state = {
    user: null
  };

  componentDidMount = () => {
    const userString = sessionStorage.getItem("user");

    // If a user exists in the session storage
    if (userString) {
      // Decode it and set the user state
      const user = JSON.parse(userString);

      this.setState({ user });
    }
  };

  login = (username, password) => {
    api.login(username, password).then(response => {
      this.setState({ user: response });

      // Save to the state and the session, refreshing will still persist the login client side
      sessionStorage.setItem("user", JSON.stringify(response));
    });
  };

  logout = () => api.logout();

  render() {
    const { user } = this.state;

    const { loadDatabaseHandler } = this.props;

    return user ? (
      <LoggedIn
        loadDatabaseHandler={loadDatabaseHandler}
        logoutHandler={this.logout}
      />
    ) : (
      <Guest loginHandler={this.login} />
    );
  }
}

export default Auth;
