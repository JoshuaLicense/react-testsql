import React from "react";
import api from "../../utils/api";

import UserContext from "./Context";

export default class Provider extends React.Component {
  refresh = () => {
    return api
      .getCurrentUser()
      .then(data => {
        this.setState(state => ({ user: data, isLoaded: true }));
      })
      .catch(err => {
        this.setState(state => ({ user: null, isLoaded: true }));
      });
  };

  state = {
    user: null,
    isLoaded: false,
    login: this.login,
    refresh: this.refresh,
    logout: this.logout
  };

  componentDidMount() {
    return this.refresh();
  }

  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
