import React from "react";
//import PropTypes from 'prop-types';

import IconButton from "@material-ui/core/IconButton";

import LogoutIcon from "@material-ui/icons/PowerSettingsNew";

import ManageGroup from "../Group";
import ManageDatabase from "../SavedDatabase";
import api from "../../utils/api";
import DatabaseContext from "../Database/Context";
import UserContext from "./Context";

class LoggedIn extends React.Component {
  handleLogout = () => {
    return api.logout().then(() => this.props.refreshUserContext());
  };

  render() {
    return (
      <React.Fragment>
        <UserContext.Consumer>
          {({ user }) => (
            <DatabaseContext.Consumer>
              {({ database: currentDatabase, loadDatabase }) => (
                <React.Fragment>
                  <ManageDatabase
                    currentDatabase={currentDatabase}
                    loadDatabaseHandler={loadDatabase}
                    disabled={Boolean(user.group)}
                  />
                  <ManageGroup
                    loadDatabaseHandler={loadDatabase}
                    currentGroup={user && user.group}
                    refreshUserContext={this.props.refreshUserContext}
                  />
                </React.Fragment>
              )}
            </DatabaseContext.Consumer>
          )}
        </UserContext.Consumer>
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
