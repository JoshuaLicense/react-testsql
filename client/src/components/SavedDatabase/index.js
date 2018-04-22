import React from "react";
//import PropTypes from 'prop-types';

import IconButton from "material-ui/IconButton";

import Divider from "material-ui/Divider";

import Button from "material-ui/Button";

import TextField from "material-ui/TextField";

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

import SaveIcon from "material-ui-icons/Save";
import DatabaseIcon from "material-ui-icons/Storage";
import DeleteIcon from "material-ui-icons/Delete";

class DatabaseItem extends React.Component {
  handleLoadDatabase = () => {
    this.props.loadDatabaseHandler(this.props.item._id);
  };

  handleDeleteDatabase = () => {
    this.props.deleteDatabaseHandler(this.props.item._id);
  };

  render() {
    const { title, createdAt } = this.props.item;

    const date = new Date(createdAt).toDateString();

    return (
      <ListItem onClick={this.handleLoadDatabase} button>
        <ListItemText primary={title} secondary={date} />
        <ListItemSecondaryAction onClick={this.handleDeleteDatabase}>
          <IconButton aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

class SaveDatabase extends React.Component {
  state = {
    title: ""
  };

  handleSaveDatabase = async e => {
    await this.props.saveDatabaseHandler(this.state.title);

    this.setState({ title: "" });
  };

  handleChange = e => {
    this.setState({ title: e.target.value });
  };

  render() {
    const { title } = this.state;

    const { currentCount } = this.props;

    const disabled = currentCount >= 5;

    const button = disabled ? (
      <Button variant="raised" color="secondary" disabled>
        Database limit reached (5/5)
      </Button>
    ) : (
      <Button
        variant="raised"
        color="primary"
        onClick={this.handleSaveDatabase}
      >
        Save ({currentCount}/5)
      </Button>
    );

    return (
      <div>
        <DialogTitle style={{ paddingBottom: 0 }}>
          Save the current database
        </DialogTitle>
        <DialogContent style={{ paddingBottom: 0 }}>
          <TextField
            label="Choose a name..."
            value={title}
            onChange={this.handleChange}
            autoFocus
            margin="dense"
            disabled={disabled}
            fullWidth
          />
        </DialogContent>
        <DialogActions>{button}</DialogActions>
      </div>
    );
  }
}

class DatabaseList extends React.Component {
  state = {
    list: null
  };

  load = () => {
    fetch("/database/list", {
      method: "GET",
      credentials: "same-origin",
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(res => res.json())
      .then(response => this.setState({ list: response }));
  };

  componentDidMount = () => this.load();

  handleSaveDatabase = title => {
    const currentDatabase = localStorage.getItem("__testSQL_Database__");

    const blob = new Blob([currentDatabase], {
      type: `application/x-sqlite-3`
    });

    const data = new FormData();

    data.set("database", blob);
    data.set("title", title);

    fetch("/database/save", {
      method: "POST",
      body: data,
      credentials: "same-origin"
    })
      .then(res => console.log(res))
      .then(res => this.load());
  };

  handleLoadDatabase = id => {
    fetch(`/database/load/${id}`, {
      method: "GET",
      credentials: "same-origin"
    })
      .then(res => console.log(res))
      .then(res => this.load());
  };

  handleDeleteDatabase = id => {
    fetch(`/database/delete/${id}`, {
      method: "GET",
      credentials: "same-origin"
    })
      .then(res => console.log(res))
      .then(res => this.load());
  };

  render() {
    const { list } = this.state;

    const count = list && list.length;

    return (
      <Dialog
        onClose={this.props.closeHandler}
        open={this.props.open}
        aria-labelledby="simple-dialog-title"
      >
        <SaveDatabase
          currentCount={count}
          saveDatabaseHandler={this.handleSaveDatabase}
        />
        <Divider />
        <DialogTitle id="simple-dialog-title">All Saved Databases</DialogTitle>
        {count > 0 ? (
          <List>
            {list.map(database => (
              <DatabaseItem
                key={database._id}
                loadDatabaseHandler={this.handleLoadDatabase}
                deleteDatabaseHandler={this.handleDeleteDatabase}
                item={database}
              />
            ))}
          </List>
        ) : (
          <DialogContent>
            <DialogContentText>No saved databases yet!</DialogContentText>
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

class DatabaseManager extends React.Component {
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
    const { loadDatabaseHandler } = this.props;

    return (
      <span>
        <IconButton color="inherit" aria-label="Saved Database Actions">
          <DatabaseIcon onClick={this.open} />
        </IconButton>
        <DatabaseList
          open={open}
          loadDatabaseHandler={loadDatabaseHandler}
          closeHandler={this.close}
        />
      </span>
    );
  }
}

export default DatabaseManager;
