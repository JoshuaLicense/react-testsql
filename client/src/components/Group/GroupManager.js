import React from "react";

import Dialog from "@material-ui/core/Dialog";

import { Route, Switch } from "react-router-dom";

import GroupList from "./GroupList";
import CreateGroup from "./CreateGroup";
import ManageGroup from "./ManageGroup";

import { BrowserRouter as Router } from "react-router-dom";

export default class GroupManager extends React.Component {
  handleClose = () => this.props.closeHandler();

  render() {
    const {
      currentGroup,
      loadDatabaseHandler,
      joinGroupHandler,
      leaveGroupHandler
    } = this.props;

    const ManageGroupComponent = ({ match }) => (
      <Dialog onClose={this.handleClose} open fullScreen>
        <ManageGroup match={match} closeHandler={this.handleClose} />
      </Dialog>
    );

    const CreateGroupComponent = () => (
      <Dialog onClose={this.handleClose} open fullWidth>
        <CreateGroup closeHandler={this.handleClose} />
      </Dialog>
    );

    const GroupListComponent = () => (
      <Dialog onClose={this.handleClose} open fullWidth>
        <GroupList
          currentGroup={currentGroup}
          joinGroupHandler={joinGroupHandler}
          leaveGroupHandler={leaveGroupHandler}
          loadDatabaseHandler={loadDatabaseHandler}
          closeHandler={this.handleClose}
        />
      </Dialog>
    );

    // Why do some routes use `component` prop and some the `render` prop?
    // https://stackoverflow.com/a/48152635
    return (
      <Router>
        <Switch>
          <Route
            path="/group/manage/:id/:title"
            component={ManageGroupComponent}
          />

          <Route path="/group/create" render={CreateGroupComponent} />

          <Route render={GroupListComponent} />
        </Switch>
      </Router>
    );
  }
}
