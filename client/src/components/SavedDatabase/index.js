import React from "react";
//import PropTypes from 'prop-types';

import api from "../../utils/api";

import SQL from "sql.js";

import IconButton from "@material-ui/core/IconButton";

import Divider from "@material-ui/core/Divider";

import Button from "@material-ui/core/Button";

import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import DatabaseIcon from "@material-ui/icons/Storage";
import DeleteIcon from "@material-ui/icons/Delete";

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

    const { currentSavedDatabaseCount } = this.props;

    const disabled = currentSavedDatabaseCount >= 5;

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
        Save ({currentSavedDatabaseCount}/5)
      </Button>
    );

    return (
      <React.Fragment>
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
      </React.Fragment>
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
    const database = this.props.currentDatabase.export();

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

        const database = new SQL.Database(typedArray);

        this.props.loadDatabaseHandler(database);
      })
      .then(() => this.props.closeHandler());
  };

  handleDeleteDatabase = id => {
    api.deleteDatabase(id).then(res => this.load());
  };

  render() {
    const { list } = this.state;

    const { open, closeHandler, currentDatabase } = this.props;

    const count = list && list.length;

    return (
      <Dialog
        onClose={closeHandler}
        open={open}
        aria-labelledby="simple-dialog-title"
      >
        <SaveDatabase
          currentDatabase={currentDatabase}
          saveDatabaseHandler={this.handleSaveDatabase}
          currentSavedDatabaseCount={count}
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
          <Button onClick={closeHandler} color="primary">
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

    const { loadDatabaseHandler, currentDatabase } = this.props;

    return (
      <React.Fragment>
        <IconButton color="inherit" aria-label="Saved Database Actions">
          <DatabaseIcon onClick={this.open} />
        </IconButton>
        <DatabaseList
          open={open}
          currentDatabase={currentDatabase}
          loadDatabaseHandler={loadDatabaseHandler}
          closeHandler={this.close}
        />
      </React.Fragment>
    );
  }
}

export default DatabaseManager;
