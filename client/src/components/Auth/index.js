import React from "react";
//import PropTypes from 'prop-types';

import Guest from "./Guest";
import LoggedIn from "./LoggedIn";

class Auth extends React.Component {
  state = {
    user: null
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
      headers: new Headers({
        "Content-Type": "application/json"
      })
    }).then(response => this.setState({ user: null }));
  };

  render() {
    const { user } = this.state;

    return user ? (
      <LoggedIn logoutHandler={this.logout} />
    ) : (
      <Guest loginHandler={this.login} />
    );
  }
}

export default Auth;
