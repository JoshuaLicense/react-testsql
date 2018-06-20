import React from "react";

import IconButton from "@material-ui/core/IconButton";
import GroupIcon from "@material-ui/icons/GroupWork";

import Dialog from "@material-ui/core/Dialog";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import GroupList from "./GroupList";
import CreateGroup from "./CreateGroup";
import ManageGroup from "./ManageGroup";

import Tooltip from "@material-ui/core/Tooltip";

class GroupManager extends React.Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;

    const {
      currentGroup,
      loadDatabaseHandler,
      refreshUserContext
    } = this.props;

    return (
      <React.Fragment>
        <Tooltip title="Groups">
          <IconButton
            color={currentGroup ? "secondary" : "inherit"}
            aria-label="Group List"
            onClick={this.handleOpen}
          >
            <GroupIcon />
          </IconButton>
        </Tooltip>

        <Dialog fullWidth onClose={this.handleClose} open={open}>
          <Router>
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <GroupList
                    currentGroup={currentGroup}
                    refreshUserContext={refreshUserContext}
                    loadDatabaseHandler={loadDatabaseHandler}
                    closeHandler={this.handleClose}
                  />
                )}
              />
              <Route
                path="/group/create"
                render={props => (
                  <CreateGroup {...props} closeHandler={this.handleClose} />
                )}
              />
              <Route
                path="/group/manage/:id"
                render={props => (
                  <ManageGroup {...props} closeHandler={this.handleClose} />
                )}
              />
            </Switch>
          </Router>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default GroupManager;
