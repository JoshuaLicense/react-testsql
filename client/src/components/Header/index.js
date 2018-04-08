import React from 'react';
//import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar'

import Button from 'material-ui/Button';

import Menu, { MenuItem } from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

import Typography from 'material-ui/Typography';

import Hidden from 'material-ui/Hidden';

import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
} from 'material-ui/Dialog';

import Tabs, { Tab } from 'material-ui/Tabs';

import AccountCircle from 'material-ui-icons/AccountCircle';

const drawerWidth = 240;

const styles = theme => ({
  rootroot: {
    flexGrow: 1,
    height: 430,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  userActions: {
    marginRight: 16
  },
  flex: {
    flex: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
});

class ApplicationStructure extends React.Component {
  state = {
    anchorEl: null,
    openLogin: false,
    currentTab: 0,
  };
  
  handleDrawerToggle = () => {
    this.props.toggleActionSidebarHandler();
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, auth, sidebarToggler } = this.props;
    const { anchorEl, currentTab } = this.state;

    return (
        <AppBar
        position="fixed"
        className={classes.appBar}>
          <Toolbar>
            <Hidden mdUp>
              <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => sidebarToggler()}
              className={classes.menuButton}>
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Typography variant="title" color="inherit" className={classes.flex} noWrap>
              React testSQL
            </Typography>
            {!auth && (
              <div>
                <Button color="inherit" onClick={() => this.setState({ openLogin: true })}>Login</Button>
                <Dialog
                open={this.state.openLogin}
                onClose={() => this.setState({ openLogin: false })}
                aria-labelledby="form-dialog-title">
                  <AppBar position="static" color="default">
                    <Tabs 
                    indicatorColor="primary"
                    textColor="primary"
                    value={currentTab} 
                    onChange={(event, value) => this.setState({ currentTab: value })}
                    fullWidth>
                      <Tab label="Login" />
                      <Tab label="Register" />
                    </Tabs>
                  </AppBar>
                  <DialogContent>
                    {currentTab === 0 && (
                      <div>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="name"
                          label="Email Address"
                          type="email"
                          fullWidth
                          required />
                        <TextField
                          margin="dense"
                          id="password"
                          label="Password"
                          type="password"
                          fullWidth 
                          required />
                      </div>
                    )}
                    {currentTab === 1 && (
                      <div>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="name"
                          label="Email Address"
                          type="email"
                          fullWidth
                          required />
                        <TextField
                          margin="dense"
                          id="password"
                          label="Password"
                          type="password"
                          fullWidth
                          required />
                        <TextField
                          margin="dense"
                          id="confirm_password"
                          label="Confirm Password"
                          type="password"
                          fullWidth
                          required />
                      </div>
                    )}
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => this.setState({ openLogin: false })} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={() => this.setState({ openLogin: false })} color="primary" variant="raised">
                      Login
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            )}
            {auth && (
              <div>
                <IconButton
                aria-haspopup="true"
                onClick={event => this.setState({ anchorEl: event.currentTarget })}
                color="inherit">
                  <AccountCircle />
                </IconButton>
                <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                onClose={event => this.setState({ anchorEl: null })}>
                  <MenuItem>Profile</MenuItem>
                  <MenuItem>My account</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
    );
  }
}

export default withStyles(styles)(ApplicationStructure);