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
    title: "",
    errors: {}
  };

  handleSaveDatabase = e => {
    this.props
      .saveDatabaseHandler(this.state.title)
      .then(json => {
        this.setState({ title: "", errors: {} });
      })
      .catch(error => {
        error.json().then(({ errors }) => {
          this.setState({ errors });
        });
      });
  };

  handleChange = e => {
    this.setState({ title: e.target.value });
  };

  render() {
    const { title, errors } = this.state;

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
        <DialogContent style={{ paddingBottom: 4 }}>
          <FormControl
            error={Boolean(errors.title)}
            aria-describedby="name-error-text"
            fullWidth
          >
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              id="name"
              value={title}
              onChange={this.handleChange}
              margin="dense"
              disabled={disabled}
              autoFocus
              fullWidth
            />
            <FormHelperText id="name-error-text">
              {errors.title && errors.title.msg}
            </FormHelperText>
          </FormControl>
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
    api
      .listDatabases()
      .then(list => this.setState({ list }))
      .catch(e => console.log(e));
  };

  componentDidMount = () => this.load();

  handleSaveDatabase = title => {
    const currentDatabase = localStorage.getItem("__testSQL_Database__");

    function toBinArray(str) {
      var l = str.length,
        arr = new Uint8Array(l);
      for (var i = 0; i < l; i++) arr[i] = str.charCodeAt(i);
      return arr;
    }

    // localStorage is saved as a binary string, covert it back to an array
    const database = toBinArray(currentDatabase);

    return api.saveDatabase(title, database).then(json => {
      this.load();

      return json;
    });
  };

  handleLoadDatabase = id => {
    api
      .loadDatabase(id)
      .then(fileBuffer => {
        const typedArray = new Uint8Array(fileBuffer);

        this.props.loadDatabaseHandler(typedArray);
      })
      .then(() => this.props.closeHandler());
  };

  handleDeleteDatabase = id => {
    api.deleteDatabase(id).then(res => this.load());
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

    return (
      <span>
        <IconButton color="inherit" aria-label="Saved Database Actions">
          <DatabaseIcon onClick={this.open} />
        </IconButton>
        <DatabaseList
          open={open}
          loadDatabaseHandler={this.props.loadDatabaseHandler}
          closeHandler={this.close}
        />
      </span>
    );
  }
}

export default DatabaseManager;
