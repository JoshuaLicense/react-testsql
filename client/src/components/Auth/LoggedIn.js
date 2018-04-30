import React from "react";
//import PropTypes from 'prop-types';

import IconButton from "material-ui/IconButton";

import LogoutIcon from "material-ui-icons/PowerSettingsNew";

//import ManageSession from "../Session";
import ManageDatabase from "../SavedDatabase";

class LoggedIn extends React.Component {
  handleLogout = () => this.props.logoutHandler();

  render() {
    const { loadDatabaseHandler } = this.props;

    return (
      <div>
        <ManageDatabase loadDatabaseHandler={loadDatabaseHandler} />
        {/*<ManageSession />*/}
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
