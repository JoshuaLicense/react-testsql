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

import DatabaseIcon from "material-ui-icons/Storage";
import DeleteIcon from "material-ui-icons/Delete";
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

    const date = new Date(createdAt).toDateString();

    return (
      <ListItem onClick={this.handleJoinGroup} button>
        {isPrivate && (
          <ListItemIcon>
            <LockIcon />
          </ListItemIcon>
        )}
        <ListItemText inset primary={title} secondary={createdBy} />
        <Typography color="textSecondary">{capacity}/32</Typography>
      </ListItem>
    );
  }
}

class GroupList extends React.Component {
  state = {
    list: null
  };

  load = () => {
    api
      .listGroups()
      .then(list => this.setState({ list }))
      .catch(e => console.log(e));
  };

  componentDidMount = () => this.load();

  handleJoinGroup = id => {
    api
      .joinGroup(id)
      .then(fileBuffer => {
        const typedArray = new Uint8Array(fileBuffer);

        this.props.joinGroupHandler(typedArray);
      })
      .then(() => this.props.closeHandler());
  };

  render() {
    const { list } = this.state;

    const count = list && list.length;

    return (
      <Dialog
        fullWidth
        onClose={this.props.closeHandler}
        open={this.props.open}
        aria-labelledby="dialog-title"
      >
        <DialogTitle id="dialog-title">All Available Groups</DialogTitle>
        {count > 0 ? (
          <List>
            {list.map(group => (
              <GroupItem
                key={group._id}
                joinGroupHandler={this.handleJoinGroup}
                item={group}
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
        <IconButton color="inherit" aria-label="Group List">
          <DatabaseIcon onClick={this.open} />
        </IconButton>
        <GroupList open={open} closeHandler={this.close} />
      </span>
    );
  }
}

export default GroupManager;
