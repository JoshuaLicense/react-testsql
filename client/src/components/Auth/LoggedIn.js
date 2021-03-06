import React from "react";
//import PropTypes from 'prop-types';

import IconButton from "@material-ui/core/IconButton";

import LogoutIcon from "@material-ui/icons/PowerSettingsNew";

import Group from "../Group";
import SavedDatabase from "../SavedDatabase";

import DatabaseContext from "../Database/Context";

import { logout } from "./API";

import Tooltip from "@material-ui/core/Tooltip";

class LoggedIn extends React.Component {
  handleLogout = () => logout().then(() => this.props.logoutHandler());

  render() {
    const { user, joinGroup, leaveGroup } = this.props;

    return (
      <React.Fragment>
        <DatabaseContext.Consumer>
          {({ database: currentDatabase, loadDatabase }) => (
            <React.Fragment>
              <SavedDatabase
                currentDatabase={currentDatabase}
                loadDatabaseHandler={loadDatabase}
                disabled={Boolean(user.group)}
              />
              <Group
                loadDatabaseHandler={loadDatabase}
                currentGroup={user && user.group}
                joinGroupHandler={joinGroup}
                leaveGroupHandler={leaveGroup}
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
            <LogoutIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  }
}

export default LoggedIn;
