import React from "react";

import UserContext from "./Context";

import { getCurrentUser } from "./API";

export default class Provider extends React.Component {
  login = user => this.setState({ user });

  joinGroup = group =>
    this.setState(prevState => ({ user: { ...prevState.user, group } }));

  leaveGroup = () =>
    this.setState(prevState => ({ user: { ...prevState.user, group: null } }));

  refresh = async () => {
    try {
      const user = await getCurrentUser();

      this.setState({ user, isLoaded: true });
    } catch (e) {
      this.setState({ user: null, isLoaded: true });
    }
  };

  logout = () => this.setState({ user: null });

  state = {
    user: null,
    isLoaded: false,
    login: this.login,
    joinGroup: this.joinGroup,
    leaveGroup: this.leaveGroup,
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
