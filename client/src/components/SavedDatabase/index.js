import React from "react";

import { listDatabases } from "./API";

import IconButton from "@material-ui/core/IconButton";

import Dialog from "@material-ui/core/Dialog";

import DatabaseIcon from "@material-ui/icons/Storage";

import DatabaseList from "./DatabaseList";
import SaveDatabase from "./SaveDatabase";

import Tooltip from "@material-ui/core/Tooltip";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default class DatabaseManager extends React.Component {
  state = {
    list: null,
    open: false
  };

  componentDidMount = () => this.refreshSavedDatabaseList();

  refreshSavedDatabaseList = () =>
    listDatabases().then(list => this.setState({ list }));

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

  render() {
    const { open, list } = this.state;

    const { currentDatabase, disabled } = this.props;

    return (
      <React.Fragment>
        <Tooltip title="Saved Databases">
          <IconButton
            onClick={this.handleOpen}
            color="inherit"
            aria-label="Saved Database Actions"
            disabled={disabled}
          >
            <DatabaseIcon />
          </IconButton>
        </Tooltip>
        <Dialog onClose={this.handleClose} open={open} fullWidth>
          <Router>
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <DatabaseList
                    list={list}
                    refreshHandler={this.refreshSavedDatabaseList}
                    closeHandler={this.handleClose}
                  />
                )}
              />
              <Route
                path="/database/create"
                render={() => (
                  <SaveDatabase
                    currentDatabase={currentDatabase}
                    currentSavedDatabaseCount={list && list.length}
                    refreshHandler={this.refreshSavedDatabaseList}
                    closeHandler={this.handleClose}
                  />
                )}
              />
            </Switch>
          </Router>
        </Dialog>
      </React.Fragment>
    );
  }
}
