import React from "react";
//import PropTypes from 'prop-types';

import Menu, { MenuItem } from "material-ui/Menu";
import IconButton from "material-ui/IconButton";
import MenuIcon from "material-ui-icons/Menu";

import AccountCircle from "material-ui-icons/AccountCircle";
import LogoutIcon from "material-ui-icons/PowerSettingsNew";
import DatabaseIcon from "material-ui-icons/Storage";
import SessionIcon from "material-ui-icons/GroupWork";

import ManageSession from "../Session";
import ManageDatabase from "../SavedDatabase";

class LoggedIn extends React.Component {
  handleLogout = () => this.props.logoutHandler();

  render() {
    return (
      <div>
        <ManageDatabase />
        <ManageSession />
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
