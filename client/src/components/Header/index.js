import React from "react";

import LoggedIn from "../Auth/LoggedIn";
import Guest from "../Auth/Guest";

import { withStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import Typography from "@material-ui/core/Typography";

import Hidden from "@material-ui/core/Hidden";
import UserContext from "../Auth/Context";

const styles = theme => ({
  sidebarToggleIcon: {
    marginRight: theme.spacing.unit * 2
  },
  userActionsContainer: {
    display: "flex",
    marginLeft: "auto"
  }
});

class Header extends React.Component {
  state = {
    anchorEl: null,
    openLogin: false,
    currentTab: 0
  };

  handleDrawerToggle = () => {
    this.props.toggleActionSidebarHandler();
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleSidebarToggle = () => this.props.sidebarToggleHandler();

  render() {
    const { classes } = this.props;

    return (
      <AppBar position="static">
        <Toolbar>
          <Hidden mdUp>
            <IconButton
              color="inherit"
              className={classes.sidebarToggleIcon}
              onClick={this.handleSidebarToggle}
              aria-label="Open drawer"
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Typography variant="title" color="inherit" noWrap>
            testSQL
          </Typography>
          <div className={classes.userActionsContainer}>
            <UserContext.Consumer>
              {({ user, refresh }) =>
                user ? (
                  <LoggedIn refreshUserContext={refresh} />
                ) : (
                  <Guest refreshUserContext={refresh} />
                )
              }
            </UserContext.Consumer>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Header);
