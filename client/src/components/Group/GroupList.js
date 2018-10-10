import React from "react";

import Button from "@material-ui/core/Button";

import List from "@material-ui/core/List";

import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import Typography from "@material-ui/core/Typography";

import { Link } from "react-router-dom";

import { loadDatabase } from "../SavedDatabase/API";

import GroupItem from "./GroupItem";

import { listGroups, joinGroup, leaveCurrentGroup } from "./API";
import clearQuestions from "../../questions/utils/clearQuestions";

const flexSpaceBetween = { display: "flex", justifyContent: "space-between" };

class GroupList extends React.Component {
  state = {
    list: null,
    error: null
  };

  componentDidMount = () => this.load();

  load = async () => {
    // Attempt to load all the available groups.
    try {
      const groups = await listGroups();

      this.setState({ list: groups });
    } catch (e) {
      const error = await e.json();

      this.setState({ error: error.message });
    }
  };

  handleClose = () => this.props.closeHandler();

  handleJoinGroup = async id => {
    try {
      const group = await joinGroup(id);

      // Find the group the user has just joined, and set it as active.
      // This saves pinging the server again to reload the `list` prop.
      const updatedGroupList = this.state.list.map(listGroup => {
        // Update the isCurrent for all the groups in the list, leaving the last joined group as the active one.
        listGroup.isCurrent = group._id === listGroup._id;

        return listGroup;
      });

      this.setState({ list: updatedGroupList });

      // Update the user first. Any group questions already generated will be loaded first.
      // Otherwise <Main> will generate the questions twice; once for the detected database change, then the detected group change.
      this.props.joinGroupHandler(group);

      // Once the user is marked as in this group, load the group database from the server.
      const fileBuffer = await loadDatabase(group.database);

      const typedArray = new Uint8Array(fileBuffer);

      // Now load the database into the client-side sql.js.
      this.props.loadDatabaseHandler(typedArray);
    } catch (e) {
      const error = await e.json();

      this.setState({ error: error.message });
    }
  };

  handleLeaveGroup = async () => {
    try {
      await leaveCurrentGroup();

      // Update the isCurrent for all the groups in the list to false
      const updatedGroupList = this.state.list.map(listGroup => {
        listGroup.isCurrent = false;

        return listGroup;
      });

      this.setState({ list: updatedGroupList });
    } catch (e) {
      const error = await e.json();

      this.setState({ error: error.message });
    }

    // Clear all the cached questions, this will prompt the generation of a new set.
    clearQuestions();

    this.props.leaveGroupHandler();
  };

  render() {
    const { list, error } = this.state;

    return (
      <React.Fragment>
        {error && (
          <DialogTitle disableTypography>
            <Typography color="error" align="center">
              {error}
            </Typography>
          </DialogTitle>
        )}
        <DialogTitle id="dialog-title">
          <div style={flexSpaceBetween}>
            Groups
            <Button
              component={Link}
              to="/group/create"
              color="primary"
              variant="raised"
              size="small"
            >
              Create &raquo;
            </Button>
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Groups allow you to customize the experience and track the progress
            of every user that joins your group.
          </DialogContentText>
        </DialogContent>
        {list && (
          <List dense={list.length >= 5}>
            {list.map(group => (
              <GroupItem
                key={group._id}
                group={group}
                joinGroupHandler={this.handleJoinGroup}
                leaveGroupHandler={this.handleLeaveGroup}
              />
            ))}
          </List>
        )}
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </React.Fragment>
    );
  }
}

export default GroupList;
