import React from "react";

import IconButton from "@material-ui/core/IconButton";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import DeleteIcon from "@material-ui/icons/Delete";
import LeaveIcon from "@material-ui/icons/ExitToApp";
import ManageIcon from "@material-ui/icons/Settings";

import CurrentIcon from "@material-ui/icons/StarBorder";

import { Link } from "react-router-dom";

export default class GroupItem extends React.Component {
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
