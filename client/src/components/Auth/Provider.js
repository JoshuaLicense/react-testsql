import React from "react";

import UserContext from "./Context";

import { getCurrentUser } from "./API";

export default class Provider extends React.Component {
  refresh = () => {
    return getCurrentUser()
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
    refresh: this.refresh
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
