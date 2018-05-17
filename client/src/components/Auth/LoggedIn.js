import React from "react";
//import PropTypes from 'prop-types';

import IconButton from "material-ui/IconButton";

import LogoutIcon from "material-ui-icons/PowerSettingsNew";

import ManageGroup from "../Group";
import ManageDatabase from "../SavedDatabase";
import api from "../../utils/api";

class LoggedIn extends React.Component {
  handleLogout = () => {
    return api.logout().then(() => this.props.refreshUserContext());
  };

  render() {
    const { loadDatabaseHandler } = this.props;

    return (
      <React.Fragment>
        <ManageDatabase loadDatabaseHandler={loadDatabaseHandler} />
        <ManageGroup loadDatabaseHandler={loadDatabaseHandler} />
        <IconButton
          color="inherit"
          aria-label="Logout"
          onClick={this.handleLogout}
        >
          <LogoutIcon />
        </IconButton>
      </React.Fragment>
    );
  }
}

export default LoggedIn;
