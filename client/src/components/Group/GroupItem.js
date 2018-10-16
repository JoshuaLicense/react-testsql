import React from "react";

import IconButton from "@material-ui/core/IconButton";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import Typography from "@material-ui/core/Typography";

import LeaveIcon from "@material-ui/icons/ExitToApp";
import ManageIcon from "@material-ui/icons/Settings";

import Link from "react-router-dom/Link";

const progressStyle = { flex: "0 0 40px" };

export default class GroupItem extends React.Component {
  handleJoinGroup = () => this.props.joinGroupHandler(this.props.group._id);

  handleLeaveGroup = () => this.props.leaveGroupHandler();

  render() {
    const {
      _id: id,
      title,
      completedQuestions = "-",
      totalQuestions = "-",
      canManage,
      isCurrent
    } = this.props.group;

    return (
      <ListItem
        onClick={this.handleJoinGroup}
        disabled={isCurrent}
        selected={isCurrent}
        component="li"
        button
      >
        <Typography
          color="textSecondary"
          style={progressStyle}
          title={`You have completed ${completedQuestions} out of ${totalQuestions} questions in this group.`}
        >
          {`${completedQuestions}/${totalQuestions}`}
        </Typography>
        <ListItemText primary={title} />
        {(canManage || isCurrent) && (
          <ListItemSecondaryAction>
            {canManage && (
              <IconButton
                component={Link}
                to={`/group/manage/${id}/${title}`}
                title="Manage this group"
                aria-label="Manage group"
              >
                <ManageIcon fontSize="small" />
              </IconButton>
            )}
            {isCurrent && (
              <IconButton
                color="secondary"
                onClick={this.handleLeaveGroup}
                title="Leave this group"
                aria-label="Leave current group"
              >
                <LeaveIcon fontSize="small" />
              </IconButton>
            )}
          </ListItemSecondaryAction>
        )}
      </ListItem>
    );
  }
}
