import React from "react";

import List from "@material-ui/core/List";

import ListSubheader from "@material-ui/core/ListSubheader";

import DialogTitle from "@material-ui/core/DialogTitle";

import Typography from "@material-ui/core/Typography";

import { loadDatabase } from "../SavedDatabase/API";

import GroupItem from "./GroupItem";

import {
  listActiveGroups,
  joinGroup,
  leaveActiveGroup,
  leaveCurrentGroup
} from "./API";

export default class ActiveGroupList extends React.Component {
  state = {
    list: null,
    error: null
  };

  componentDidMount = () => this.load();

  load = () =>
    listActiveGroups()
      .then(list => this.setState({ list }))
      .catch(error => {
        error.json().then(json => this.setState({ error: json.message }));
      });

  handleJoinGroup = id => {
    this.setState({ error: null });

    return joinGroup(id)
      .then(group => loadDatabase(group.database))
      .then(fileBuffer => {
        const typedArray = new Uint8Array(fileBuffer);

        return this.props.loadDatabaseHandler(typedArray);
      })
      .then(() => this.props.refreshUserContext())
      .then(() => this.load())
      .catch(error => {
        error.json().then(json => this.setState({ error: json.message }));
      });
  };

  handleLeaveCurrentGroup = () => {
    this.setState({ error: null });

    return leaveCurrentGroup()
      .then(() => this.load())
      .then(() => this.props.refreshUserContext())
      .catch(error => {
        error.json().then(json => this.setState({ error: json.message }));
      });
  };

  handleLeaveActiveGroup = id => {
    this.setState({ error: null });

    return leaveActiveGroup(id)
      .then(() => this.load())
      .catch(error => {
        error.json().then(json => this.setState({ error: json.message }));
      });
  };

  render() {
    const { list, error } = this.state;

    if (!list) {
      return null;
    }

    return (
      <List
        dense={list.length >= 5}
        subheader={<ListSubheader>Your active groups</ListSubheader>}
      >
        {error && (
          <DialogTitle disableTypography>
            <Typography color="error" align="center">
              {error}
            </Typography>
          </DialogTitle>
        )}
        {list.map(group => (
          <GroupItem
            key={group._id}
            id={group._id}
            title={group.title}
            isCurrent={group.isCurrent}
            canManage={group.canManage}
            canLeave={group.canLeave}
            joinGroupHandler={this.handleJoinGroup}
            leaveCurrentGroupHandler={this.handleCurrentLeaveGroup}
            leaveGroupHandler={this.handleLeaveGroup}
          />
        ))}
      </List>
    );
  }
}
