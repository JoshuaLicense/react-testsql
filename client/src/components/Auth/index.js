import React from "react";
//import PropTypes from 'prop-types';

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
    const data = { username, password };

    fetch("/login", {
      method: "POST",
      body: JSON.stringify(data),
      credentials: "same-origin",
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(response => response.json())
      .catch(error => console.error("Error:", error))
      .then(response => {
        this.setState({ user: response });

        // Save to the state and the session, refreshing will still persist the login client side
        sessionStorage.setItem("user", JSON.stringify(response));

        fetch("/database/list", {
          method: "GET",
          credentials: "same-origin",
          headers: new Headers({
            "Content-Type": "application/json"
          })
        });
      });
  };

  logout = () => {
    fetch("/logout", {
      method: "GET",
      credentials: "same-origin",
      headers: new Headers({
        "Content-Type": "application/json"
      })
    }).then(response => this.setState({ user: null }));
  };

  render() {
    const { user } = this.state;

    return user ? (
      <LoggedIn user={user} logoutHandler={this.logout} />
    ) : (
      <Guest loginHandler={this.login} />
    );
  }
}

export default Auth;