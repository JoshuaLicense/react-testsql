import React from "react";

import IconButton from "@material-ui/core/IconButton";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import RemoveUserIcon from "@material-ui/icons/RemoveCircle";

import Typography from "@material-ui/core/Typography";

export default class GroupUser extends React.Component {
  handleRemoveUser = () => this.props.removeHandler(this.props.user._id);

  render() {
    const { user } = this.props;

    const { username, totalQuestions, questionsCompleted, canRemove } = user;

    return (
      <ListItem button>
        <Typography color="textSecondary">{`${questionsCompleted}/${totalQuestions}`}</Typography>
        <ListItemText inset primary={username} />
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
