import React from "react";

import LoggedIn from "./LoggedIn";
import Guest from "./Guest";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import Typography from "@material-ui/core/Typography";

import Hidden from "@material-ui/core/Hidden";
import UserContext from "./Context";

import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  sidebarToggleIcon: {
    marginRight: "8px",
    marginLeft: "-8px",
    [theme.breakpoints.up("sm")]: {
      marginLeft: "-16px"
    }
  },
  userActionsContainer: {
    marginLeft: "auto"
  }
});

const Header = props => (
  <AppBar position="fixed">
    <Toolbar>
      <Hidden implementation="css" mdUp>
        <IconButton
          color="inherit"
          className={props.classes.sidebarToggleIcon}
          onClick={props.sidebarToggleHandler}
          aria-label="Open drawer"
        >
          <MenuIcon fontSize="small" />
        </IconButton>
      </Hidden>
      <Typography variant="h6" color="inherit" noWrap>
        testSQL
      </Typography>
      {!process.env.REACT_APP_CLIENT_ONLY && (
        <div className={props.classes.userActionsContainer}>
          <UserContext.Consumer>
            {({ user, isLoaded, login, joinGroup, leaveGroup, logout }) =>
              isLoaded &&
              (user ? (
                <LoggedIn
                  user={user}
                  joinGroup={joinGroup}
                  leaveGroup={leaveGroup}
                  logoutHandler={logout}
                />
              ) : (
                <Guest loginHandler={login} />
              ))
            }
          </UserContext.Consumer>
        </div>
      )}
    </Toolbar>
  </AppBar>
);

export default withStyles(styles)(Header);
