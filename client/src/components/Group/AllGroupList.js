import React from "react";

import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";

import DialogTitle from "@material-ui/core/DialogTitle";

import Typography from "@material-ui/core/Typography";

import { loadDatabase } from "../SavedDatabase/API";

import { listGroups, joinGroup } from "./API";

import GroupItem from "./GroupItem";

export default class AllGroupList extends React.Component {
  state = {
    list: null,
    error: null
  };

  componentDidMount = () => this.load();

  load = () =>
    listGroups()
      .then(list => {
        this.setState({ list });
      })
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

  render() {
    const { list, error } = this.state;

    const listCount = list && list.length;

    return (
      <React.Fragment>
        {error && (
          <DialogTitle disableTypography>
            <Typography color="error" align="center">
              {error}
            </Typography>
          </DialogTitle>
        )}
        {list && (
          <List
            dense={listCount >= 5}
            subheader={<ListSubheader>All available groups</ListSubheader>}
          >
            {list.map(group => (
              <GroupItem
                key={group._id}
                id={group._id}
                title={group.title}
                joinGroupHandler={this.handleJoinGroup}
              />
            ))}
          </List>
        )}
      </React.Fragment>
    );
  }
}
