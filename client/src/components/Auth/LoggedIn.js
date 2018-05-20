import React from "react";
//import PropTypes from 'prop-types';

import IconButton from "@material-ui/core/IconButton";

import LogoutIcon from "@material-ui/icons/PowerSettingsNew";

import ManageGroup from "../Group";
import ManageDatabase from "../SavedDatabase";
import api from "../../utils/api";
import DatabaseContext from "../Database/Context";

class LoggedIn extends React.Component {
  handleLogout = () => {
    return api.logout().then(() => this.props.refreshUserContext());
  };

  render() {
    return (
      <React.Fragment>
        <DatabaseContext.Consumer>
          {({ database: currentDatabase, loadDatabase }) => (
            <React.Fragment>
              <ManageDatabase
                currentDatabase={currentDatabase}
                loadDatabaseHandler={loadDatabase}
              />
              <ManageGroup loadDatabaseHandler={loadDatabase} />
            </React.Fragment>
          )}
        </DatabaseContext.Consumer>
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
