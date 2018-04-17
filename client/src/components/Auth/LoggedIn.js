import React from "react";
//import PropTypes from 'prop-types';

import Menu, { MenuItem } from "material-ui/Menu";
import IconButton from "material-ui/IconButton";
import MenuIcon from "material-ui-icons/Menu";

import AccountCircle from "material-ui-icons/AccountCircle";
import DatabaseIcon from "material-ui-icons/Storage";
import SessionIcon from "material-ui-icons/GroupWork";

class LoggedIn extends React.Component {
  state = {
    anchorEl: null
  };

  handleLogout = () => this.props.logoutHandler();

  handleClick = event => {
    console.dir(event.currentTarget);
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <IconButton
          id="database-actions"
          color="inherit"
          aria-label="Delete Actions"
        >
          <DatabaseIcon />
        </IconButton>
        <IconButton
          id="session-actions"
          onClick={this.handleClick}
          color="inherit"
          aria-label="Session Actions"
        >
          <SessionIcon />
        </IconButton>
        <Menu
          id="database-appbar"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          onClose={this.handleClose}
        >
          <MenuItem>Profilex</MenuItem>
          <MenuItem>My account</MenuItem>
          <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
        </Menu>
        <IconButton
          onClick={this.handleClick}
          color="inherit"
          aria-label="Account"
        >
          <AccountCircle />
        </IconButton>
      </div>
    );
  }
}

export default LoggedIn;
