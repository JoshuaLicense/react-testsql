import React from "react";
//import PropTypes from 'prop-types';

import * as api from "./API";

import IconButton from "@material-ui/core/IconButton";

import Divider from "@material-ui/core/Divider";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

import DatabaseIcon from "@material-ui/icons/Storage";

import Button from "@material-ui/core/Button";

import DatabaseList from "./DatabaseList";
import SaveDatabase from "./SaveDatabase";

import Tooltip from "@material-ui/core/Tooltip";

export default class DatabaseManager extends React.Component {
  state = {
    list: null,
    open: false
  };

  refreshSavedDatabaseList = () =>
    api.listDatabases().then(list => this.setState({ list }));

  handleSaveDatabase = title => {
    const database = this.props.currentDatabase.export();

    return api.saveDatabase(title, database).then(json => {
      this.refreshSavedDatabaseList();

      return json;
    });
  };

  handleLoadDatabase = id => {
    return api
      .loadDatabase(id)
      .then(fileBuffer => {
        const typedArray = new Uint8Array(fileBuffer);

        return this.props.loadDatabaseHandler(typedArray);
      })
      .then(() => this.close())
      .catch(error => {
        error.json().then(json => this.setState({ error: json.message }));
      });
  };

  handleDeleteDatabase = id =>
    api.deleteDatabase(id).then(() => this.refreshSavedDatabaseList());

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

  render() {
    const { open, list } = this.state;

    const { currentDatabase, disabled } = this.props;

    return (
      <React.Fragment>
        <Tooltip title="Saved Databases">
          <IconButton
            onClick={this.open}
            color="inherit"
            aria-label="Saved Database Actions"
            disabled={disabled}
          >
            <DatabaseIcon />
          </IconButton>
        </Tooltip>
        <Dialog onClose={this.close} open={open} fullWidth>
          <DialogTitle>Saved Databases</DialogTitle>
          <DialogContent style={{ paddingBottom: 0 }}>
            <DialogContentText>
              Allows you to save your current database in a more permanent
              location, the server.
            </DialogContentText>
          </DialogContent>
          <SaveDatabase
            currentDatabase={currentDatabase}
            currentSavedDatabaseCount={list && list.length}
            refreshHandler={this.refreshSavedDatabaseList}
            clickHandler={this.handleSaveDatabase}
          />
          <Divider />
          <DatabaseList
            list={list}
            refreshHandler={this.refreshSavedDatabaseList}
            clickHandler={this.handleLoadDatabase}
            deleteHandler={this.handleDeleteDatabase}
            closeHandler={this.close}
          />
          <DialogActions>
            <Button onClick={this.close} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}
