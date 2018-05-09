import React from "react";
//import PropTypes from 'prop-types';

import api from "../../utils/api";

import IconButton from "material-ui/IconButton";

import Divider from "material-ui/Divider";

import Button from "material-ui/Button";

import Input, { InputLabel } from "material-ui/Input";
import { FormControl, FormHelperText } from "material-ui/Form";

import List, {
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction
} from "material-ui/List";

import Dialog, {
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText
} from "material-ui/Dialog";

import GroupIcon from "material-ui-icons/GroupWork";
import DeleteIcon from "material-ui-icons/Delete";
import ManageIcon from "material-ui-icons/Settings";
import LockIcon from "material-ui-icons/Lock";
import { Typography } from "material-ui";

class GroupItem extends React.Component {
  handleJoinGroup = () => {
    this.props.joinGroupHandler(this.props.item._id);
  };

  render() {
    const {
      title,
      createdAt,
      capacity,
      createdBy,
      isPrivate
    } = this.props.item;

    const { canManage } = this.props;

    const date = new Date(createdAt).toDateString();

    return (
      <ListItem onClick={this.handleJoinGroup} button>
        {isPrivate && (
          <ListItemIcon>
            <LockIcon />
          </ListItemIcon>
        )}
        <ListItemText inset primary={title} secondary={createdBy} />
        {canManage && (
          <ListItemSecondaryAction>
            <IconButton aria-label="Manage">
              <ManageIcon />
            </IconButton>
          </ListItemSecondaryAction>
        )}
      </ListItem>
    );
  }
}

class GroupList extends React.Component {
  state = {
    myList: null,
    list: null,
    error: null
  };

  load = () => {
    api
      .listMyGroups()
      .then(myList => this.setState({ myList }))
      .catch(e => console.log(e));

    api
      .listGroups()
      .then(list => this.setState({ list }))
      .catch(e => console.log(e));
  };

  handleClose = () => {
    this.props.closeHandler();

    // Remove any errors from the modal.
    this.setState({ error: null });
  };

  componentDidMount = () => this.load();

  handleJoinGroup = id => {
    this.setState({ error: null });

    api
      .joinGroup(id)
      .then(fileBuffer => {
        const typedArray = new Uint8Array(fileBuffer);

        this.props.loadDatabaseHandler(typedArray);
      })
      .then(() => this.props.closeHandler())
      .catch(error => {
        error.json().then(json => this.setState({ error: json }));
      });
  };

  render() {
    const { list, myList, error } = this.state;

    const listCount = list && list.length;
    const myListCount = myList && myList.length;

    return (
      <Dialog
        fullWidth
        onClose={this.handleClose}
        open={this.props.open}
        aria-labelledby="dialog-title"
      >
        <DialogTitle id="dialog-title">Your Groups</DialogTitle>
        {myListCount > 0 ? (
          <div>
            {error && (
              <Typography color="error" align="center">
                {error}
              </Typography>
            )}
            <List dense={myListCount >= 5}>
              {myList.map(group => (
                <GroupItem
                  key={group._id}
                  joinGroupHandler={this.handleJoinGroup}
                  item={group}
                  canManage
                />
              ))}
            </List>
          </div>
        ) : (
          <DialogContent>
            <DialogContentText>
              You are not the owner of any groups!
            </DialogContentText>
          </DialogContent>
        )}
        <DialogTitle id="dialog-title">All Available Groups</DialogTitle>
        {listCount > 0 ? (
          <div>
            {error && (
              <Typography color="error" align="center">
                {error}
              </Typography>
            )}
            <List dense={listCount >= 5}>
              {list.map(group => (
                <GroupItem
                  key={group._id}
                  joinGroupHandler={this.handleJoinGroup}
                  item={group}
                />
              ))}
            </List>
          </div>
        ) : (
          <DialogContent>
            <DialogContentText>No groups available!</DialogContentText>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={this.props.closeHandler} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

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

    return (
      <span>
        <IconButton color="inherit" aria-label="Group List" onClick={this.open}>
          <GroupIcon />
        </IconButton>
        <GroupList
          open={open}
          loadDatabaseHandler={this.props.loadDatabaseHandler}
          closeHandler={this.close}
        />
      </span>
    );
  }
}

export default GroupManager;
