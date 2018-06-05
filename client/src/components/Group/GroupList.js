import React from "react";

import IconButton from "@material-ui/core/IconButton";

import Button from "@material-ui/core/Button";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListSubheader from "@material-ui/core/ListSubheader";

import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import DeleteIcon from "@material-ui/icons/Delete";
import LeaveIcon from "@material-ui/icons/ExitToApp";
import ManageIcon from "@material-ui/icons/Settings";

import CurrentIcon from "@material-ui/icons/StarBorder";

import Typography from "@material-ui/core/Typography";

import { Link } from "react-router-dom";

import { loadDatabase } from "../SavedDatabase/API";

import {
  listGroups,
  listActiveGroups,
  joinGroup,
  leaveGroup,
  leaveCurrentGroup
} from "./API";

const flexSpaceBetween = { display: "flex", justifyContent: "space-between" };

class GroupList extends React.Component {
  state = {
    activeList: null,
    list: null,
    error: null
  };

  load = async () => {
    await listActiveGroups()
      .then(activeList => this.setState({ activeList }))
      .catch(error => {
        error.json().then(json => this.setState({ error: json.message }));
      });

    return listGroups()
      .then(list => {
        this.setState({ list });
      })
      .catch(error => {
        error.json().then(json => this.setState({ error: json.message }));
      });
  };

  handleClose = () => {
    this.props.closeHandler();

    // Remove any errors from the modal.
    this.setState({ error: null });
  };

  componentDidMount = () => this.load();

  handleJoinGroup = id => {
    this.setState({ error: null });

    joinGroup(id)
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

  handleCurrentLeaveGroup = id => {
    this.setState({ error: null });

    return leaveCurrentGroup()
      .then(() => this.load())
      .then(() => this.props.refreshUserContext())
      .catch(error => {
        error.json().then(json => this.setState({ error: json.message }));
      });
  };

  handleLeaveGroup = id => {
    this.setState({ error: null });

    return leaveGroup(id)
      .then(() => this.load())
      .catch(error => {
        error.json().then(json => this.setState({ error: json.message }));
      });
  };

  render() {
    const { list, activeList, error } = this.state;

    const { currentGroup } = this.props;

    const listCount = list && list.length;
    const activeListCount = activeList && activeList.length;

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
        {activeListCount > 0 && (
          <List
            dense={activeListCount >= 5}
            subheader={<ListSubheader>Your active groups</ListSubheader>}
          >
            {activeList.map(group => (
              <GroupItem
                key={group._id}
                id={group._id}
                title={group.title}
                joinGroupHandler={this.handleJoinGroup}
                leaveCurrentGroupHandler={this.handleCurrentLeaveGroup}
                leaveGroupHandler={this.handleLeaveGroup}
                isCurrent={currentGroup && group._id === currentGroup._id}
                canManage={group.canManage}
                canLeave={group.canLeave}
              />
            ))}
          </List>
        )}
        {listCount > 0 ? (
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
        ) : (
          <DialogContent>
            <DialogContentText>No groups available!</DialogContentText>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={this.props.closeHandler} color="primary">
            Close
          </Button>
        </DialogActions>
      </React.Fragment>
    );
  }
}

class GroupItem extends React.Component {
  handleJoinGroup = () => this.props.joinGroupHandler(this.props.id);
  handleLeaveCurrentGroup = () =>
    this.props.leaveCurrentGroupHandler(this.props.id);
  handleLeaveGroup = () => this.props.leaveGroupHandler(this.props.id);

  render() {
    const { id, title, canManage, canLeave, isCurrent } = this.props;

    return (
      <ListItem onClick={this.handleJoinGroup} disabled={isCurrent} button>
        {isCurrent && (
          <ListItemIcon>
            <CurrentIcon />
          </ListItemIcon>
        )}
        <ListItemText inset primary={title} />
        <ListItemSecondaryAction>
          {canManage && (
            <IconButton
              component={Link}
              to={`/group/manage/${id}`}
              aria-label="Manage group"
            >
              <ManageIcon />
            </IconButton>
          )}
          {isCurrent ? (
            <IconButton
              color="secondary"
              onClick={this.handleLeaveCurrentGroup}
              aria-label="Leave current group"
            >
              <LeaveIcon />
            </IconButton>
          ) : (
            canLeave && (
              <IconButton
                onClick={this.handleLeaveGroup}
                aria-label="Leave group"
              >
                <DeleteIcon />
              </IconButton>
            )
          )}
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

export default GroupList;
