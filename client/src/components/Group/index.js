import React from "react";

import IconButton from "@material-ui/core/IconButton";
import GroupIcon from "@material-ui/icons/GroupWork";

import Dialog from "@material-ui/core/Dialog";

import { BrowserRouter as Router, Route } from "react-router-dom";

import GroupList from "./GroupList";
import CreateGroup from "./CreateGroup";
import ManageGroup from "./ManageGroup";

import Tooltip from "@material-ui/core/Tooltip";

class GroupManager extends React.Component {
  state = {
    open: false
  };

  open = () => {
    this.setState({ open: true });
  };

  close = () => {
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
            onClick={this.open}
          >
            <GroupIcon />
          </IconButton>
        </Tooltip>

        <Router>
          <Dialog fullWidth onClose={this.close} open={open}>
            <Route
              exact
              path="/"
              render={() => (
                <GroupList
                  currentGroup={currentGroup}
                  refreshUserContext={refreshUserContext}
                  loadDatabaseHandler={loadDatabaseHandler}
                  closeHandler={this.close}
                />
              )}
            />
            <Route path="/group/create" component={CreateGroup} />
            <Route path="/group/manage/:id" component={ManageGroup} />
          </Dialog>
        </Router>
      </React.Fragment>
    );
  }
}

export default GroupManager;
