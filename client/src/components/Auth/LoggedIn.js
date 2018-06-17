import React from "react";
//import PropTypes from 'prop-types';

import IconButton from "@material-ui/core/IconButton";

import LogoutIcon from "@material-ui/icons/PowerSettingsNew";

import ManageGroup from "../Group";
import ManageDatabase from "../SavedDatabase";

import DatabaseContext from "../Database/Context";
import UserContext from "./Context";

import { logout } from "./API";

import Tooltip from "@material-ui/core/Tooltip";

class LoggedIn extends React.Component {
  handleLogout = () => {
    return logout().then(() => this.props.refreshUserContext());
  };

  render() {
    return (
      <React.Fragment>
        <UserContext.Consumer>
          {({ user }) => (
            <React.Fragment>
              <DatabaseContext.Consumer>
                {({ database: currentDatabase, loadDatabase }) => (
                  <React.Fragment>
                    <ManageDatabase
                      currentDatabase={currentDatabase}
                      loadDatabaseHandler={loadDatabase}
                      disabled={Boolean(user.group)}
                    />
                  </React.Fragment>
                )}
              </DatabaseContext.Consumer>
              <ManageGroup currentGroup={user && user.group} />
            </React.Fragment>
          )}
        </UserContext.Consumer>

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
