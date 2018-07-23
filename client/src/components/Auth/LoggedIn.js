import React from "react";
//import PropTypes from 'prop-types';

import IconButton from "@material-ui/core/IconButton";

import LogoutIcon from "@material-ui/icons/PowerSettingsNew";

import ManageGroup from "../Group";
import ManageDatabase from "../SavedDatabase";

import DatabaseContext from "../Database/Context";

import { logout } from "./API";

import Tooltip from "@material-ui/core/Tooltip";

class LoggedIn extends React.Component {
  handleLogout = () => logout().then(() => this.props.refreshUserContext());

  render() {
    const { user, refreshUserContext } = this.props;

    return (
      <React.Fragment>
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
                refreshUserContext={refreshUserContext}
              />
            </React.Fragment>
          )}
        </DatabaseContext.Consumer>

        <Tooltip title="Logout">
          <IconButton
            color="inherit"
            aria-label="Logout"
            onClick={this.handleLogout}
          >
            <LogoutIcon />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  }
}

export default LoggedIn;
