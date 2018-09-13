import React from "react";

import LoggedIn from "../Auth/LoggedIn";
import Guest from "../Auth/Guest";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import Typography from "@material-ui/core/Typography";

import Hidden from "@material-ui/core/Hidden";
import UserContext from "../Auth/Context";

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
    display: "flex",
    marginLeft: "auto"
  }
});

const Header = props => (
  <AppBar position="static">
    <Toolbar variant="dense">
      <Hidden implementation="css" mdUp>
        <IconButton
          color="inherit"
          className={props.classes.sidebarToggleIcon}
          onClick={props.sidebarToggleHandler}
          aria-label="Open drawer"
        >
          <MenuIcon />
        </IconButton>
      </Hidden>
      <Typography variant="title" color="inherit" noWrap>
        testSQL
      </Typography>
      <div className={props.classes.userActionsContainer}>
        <UserContext.Consumer>
          {({ user, refresh }) =>
            user ? (
              <LoggedIn user={user} refreshUserContext={refresh} />
            ) : (
              <Guest refreshUserContext={refresh} />
            )
          }
        </UserContext.Consumer>
      </div>
    </Toolbar>
  </AppBar>
);

export default withStyles(styles)(Header);
