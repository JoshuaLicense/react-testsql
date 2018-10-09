import React from "react";

import UserContext from "./Context";

import { getCurrentUser } from "./API";

export default class Provider extends React.Component {
  logout = () => this.setState({ user: null });

  refresh = async () => {
    try {
      const user = await getCurrentUser();

      this.setState({ user, isLoaded: true });
    } catch (e) {
      this.setState({ user: null, isLoaded: true });
    }
  };

  state = {
    user: null,
    isLoaded: false,
    refresh: this.refresh,
    logout: this.logout
  };

  componentDidMount() {
    this.refresh();
  }

  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
