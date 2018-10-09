import React from "react";

import { listDatabases } from "./API";

import Dialog from "@material-ui/core/Dialog";

import DatabaseList from "./DatabaseList";
import SaveDatabase from "./SaveDatabase";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default class DatabaseManager extends React.Component {
  state = {
    list: null
  };

  componentDidMount = () => this.refreshSavedDatabaseList();

  refreshSavedDatabaseList = () =>
    listDatabases().then(list => this.setState({ list }));

  handleClose = () => this.props.closeHander();

  render() {
    const { list } = this.state;

    if (list === null) {
      return null;
    }

    const { currentDatabase, loadDatabaseHandler } = this.props;

    const SaveDatabaseComponent = ({ history }) => (
      <SaveDatabase
        history={history}
        currentDatabase={currentDatabase}
        currentSavedDatabaseCount={list.length}
        refreshSavedDatabaseList={this.refreshSavedDatabaseList}
        closeHandler={this.handleClose}
      />
    );

    const DatabaseListComponent = () => (
      <DatabaseList
        list={list}
        loadDatabaseHandler={loadDatabaseHandler}
        refreshSavedDatabaseList={this.refreshSavedDatabaseList}
        closeHandler={this.handleClose}
      />
    );

    return (
      <Dialog open onClose={this.handleClose} fullWidth>
        <Router>
          <Switch>
            <Route path="/database/save" component={SaveDatabaseComponent} />
            <Route component={DatabaseListComponent} />
          </Switch>
        </Router>
      </Dialog>
    );
  }
}
