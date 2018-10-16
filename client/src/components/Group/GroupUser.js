import React from "react";

import IconButton from "@material-ui/core/IconButton";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import RemoveUserIcon from "@material-ui/icons/RemoveCircle";

import Typography from "@material-ui/core/Typography";

import Red from "@material-ui/core/colors/red";
import Green from "@material-ui/core/colors/green";

export default class GroupUser extends React.Component {
  handleRemoveUser = () => this.props.removeHandler(this.props.user._id);

  render() {
    const { user } = this.props;

    const {
      username,
      active,
      totalQuestions,
      questionsCompleted,
      canRemove,
      updatedAt
    } = user;

    const lastActive = new Date(updatedAt).toLocaleString("en-GB");

    const percentage = Math.round((questionsCompleted / totalQuestions) * 100);

    const colorCodedAverageText =
      percentage < 20 ? Red[500] : percentage > 80 ? Green[500] : "inherit";

    return (
      <ListItem divider dense>
        <Typography
          style={{ color: colorCodedAverageText }}
          title={`${username} has completed ${percentage}% (${questionsCompleted}/${totalQuestions}) of the questions.`}
        >{`${percentage}%`}</Typography>
        <ListItemText
          inset
          primary={username}
          secondary={active ? "Active" : `Last active ${lastActive}`}
        />
        {canRemove && (
          <ListItemSecondaryAction>
            <IconButton
              color="secondary"
              onClick={this.handleRemoveUser}
              aria-label="Remove User from the group"
            >
              <RemoveUserIcon />
            </IconButton>
          </ListItemSecondaryAction>
        )}
      </ListItem>
    );
  }
}
