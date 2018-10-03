import React from "react";

import IconButton from "@material-ui/core/IconButton";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import DeleteIcon from "@material-ui/icons/Delete";

export default class DatabaseItem extends React.Component {
  handleClick = () => {
    this.props.clickHandler(this.props.database._id);
  };

  handleDelete = () => {
    this.props.deleteHandler(this.props.database._id);
  };

  render() {
    const { title, createdAt } = this.props.database;

    const date = new Date(createdAt).toDateString();

    return (
      <ListItem onClick={this.handleClick} button>
        <ListItemText primary={title} secondary={date} />
        {this.props.deleteHandler && (
          <ListItemSecondaryAction onClick={this.handleDelete}>
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        )}
      </ListItem>
    );
  }
}
