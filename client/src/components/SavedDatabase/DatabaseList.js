import React from "react";
//import PropTypes from 'prop-types';

import IconButton from "@material-ui/core/IconButton";

import Button from "@material-ui/core/Button";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import DeleteIcon from "@material-ui/icons/Delete";

import Typography from "@material-ui/core/Typography";

class DatabaseItem extends React.Component {
  handleClick = () => {
    this.props.clickHandler(this.props.id);
  };

  handleDelete = () => {
    this.props.deleteHandler(this.props.id);
  };

  render() {
    const { title, createdAt, deleteHandler } = this.props;

    const date = new Date(createdAt).toDateString();

    return (
      <ListItem onClick={this.handleClick} button>
        <ListItemText primary={title} secondary={date} />
        {deleteHandler && (
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

export default class DatabaseList extends React.Component {
  state = {
    error: null
  };

  componentDidMount = () => this.props.refreshHandler();

  render() {
    const { error } = this.state;

    const {
      list,
      clickHandler,
      deleteHandler,
      closeHandler,
      dense
    } = this.props;

    const count = list && list.length;

    return (
      <React.Fragment>
        {error && (
          <DialogTitle disableTypography>
            <Typography color="error" align="center">
              {error}
            </Typography>
          </DialogTitle>
        )}
        {count > 0 ? (
          <List dense={Boolean(dense)}>
            {list.map(database => (
              <DatabaseItem
                key={database._id}
                id={database._id}
                title={database.title}
                createdAt={database.createdAt}
                clickHandler={clickHandler}
                deleteHandler={deleteHandler}
              />
            ))}
          </List>
        ) : (
          <DialogContent>
            <DialogContentText>No saved databases yet!</DialogContentText>
          </DialogContent>
        )}
      </React.Fragment>
    );
  }
}
