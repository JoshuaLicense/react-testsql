import React from "react";
//import PropTypes from 'prop-types';

import IconButton from "material-ui/IconButton";

import LogoutIcon from "material-ui-icons/PowerSettingsNew";

import ManageGroup from "../Group";
import ManageDatabase from "../SavedDatabase";

class LoggedIn extends React.Component {
  handleLogout = () => this.props.logoutHandler();

  render() {
    const { loadDatabaseHandler } = this.props;

    return (
      <div>
        <ManageDatabase loadDatabaseHandler={loadDatabaseHandler} />
        <ManageGroup loadDatabaseHandler={loadDatabaseHandler} />
        <IconButton
          color="inherit"
          aria-label="Logout"
          onClick={this.handleLogout}
        >
          <LogoutIcon />
        </IconButton>
      </div>
    );
  }
}

export default LoggedIn;
