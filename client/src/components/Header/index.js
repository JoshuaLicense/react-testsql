import React from "react";

import Auth from "../Auth";
//import PropTypes from 'prop-types';
import { withStyles } from "material-ui/styles";

import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";

import Button from "material-ui/Button";

import Menu, { MenuItem } from "material-ui/Menu";
import IconButton from "material-ui/IconButton";
import MenuIcon from "material-ui-icons/Menu";

import Typography from "material-ui/Typography";

import Hidden from "material-ui/Hidden";

import TextField from "material-ui/TextField";
import Dialog, { DialogActions, DialogContent } from "material-ui/Dialog";

import Tabs, { Tab } from "material-ui/Tabs";

import AccountCircle from "material-ui-icons/AccountCircle";

const drawerWidth = 240;

const styles = theme => ({
  rootroot: {
    flexGrow: 1,
    height: 430,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex"
  },
  userActions: {
    marginRight: 16
  },
  flex: {
    flex: 1
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  drawerPaper: {
    position: "relative",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
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

  render() {
    const { classes, auth, sidebarToggler } = this.props;
    const { anchorEl, currentTab } = this.state;

    return (
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Hidden mdUp>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => sidebarToggler()}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Typography
            variant="title"
            color="inherit"
            className={classes.flex}
            noWrap
          >
            React testSQL
          </Typography>
          <Auth />
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Header);
