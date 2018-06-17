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

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;

    const { currentGroup } = this.props;

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

        <Router>
          <Dialog fullWidth onClose={this.handleClose} open={open}>
            <Route exact path="/" render={GroupList} />
            <Route path="/group/create" render={CreateGroup} />
            <Route path="/group/manage/:id" component={ManageGroup} />
          </Dialog>
        </Router>
      </React.Fragment>
    );
  }
}

export default GroupManager;
