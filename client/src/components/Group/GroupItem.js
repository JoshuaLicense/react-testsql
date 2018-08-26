import React from "react";

import IconButton from "@material-ui/core/IconButton";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import Typography from "@material-ui/core/Typography";

import LeaveIcon from "@material-ui/icons/ExitToApp";
import ManageIcon from "@material-ui/icons/Settings";

import { Link } from "react-router-dom";

export default class GroupItem extends React.Component {
  handleJoinGroup = () => this.props.joinGroupHandler(this.props.group._id);

  handleLeaveCurrentGroup = () => this.props.leaveCurrentGroupHandler();

  render() {
    const {
      _id: id,
      title,
      completedQuestions,
      totalQuestions,
      canManage,
      isCurrent
    } = this.props.group;

    return (
      <ListItem onClick={this.handleJoinGroup} disabled={isCurrent} button>
        {totalQuestions && (
          <Typography color="textSecondary">{`${completedQuestions}/${totalQuestions}`}</Typography>
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
          {isCurrent && (
            <IconButton
              color="secondary"
              onClick={this.handleLeaveCurrentGroup}
              aria-label="Leave current group"
            >
              <LeaveIcon />
            </IconButton>
          )}
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}
