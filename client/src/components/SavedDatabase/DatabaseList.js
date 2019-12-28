import React from "react";

import List from "@material-ui/core/List";

import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

import Button from "@material-ui/core/Button";

import { loadDatabase, deleteDatabase } from "./API";

import DatabaseItem from "./DatabaseItem";

import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const flexSpaceBetween = { display: "flex", justifyContent: "space-between" };

export default class DatabaseList extends React.Component {
  state = {
    error: null
  };

  handleLoadDatabase = async id => {
    const { loadDatabaseHandler, closeHandler } = this.props;

    let fileBuffer;

    // Try to fetch the database from the server.
    try {
      fileBuffer = await loadDatabase(id);

      // Load the database into the client.
      loadDatabaseHandler(new Uint8Array(fileBuffer));

      return closeHandler();
    } catch (response) {
      const error = await response.text();

      this.setState({ error });
    }
  };

  handleDeleteDatabase = async id => {
    // Try to delete the database from the server.
    try {
      await deleteDatabase(id);

      // Refresh the database list so the newly deleted databases goes.
      // This could be replaced with a client-side removal of the node, if you're a stickler for optimization.
      return this.props.refreshSavedDatabaseList();
    } catch (response) {
      const error = await response.text();

      this.setState({ error });
    }
  };

  handleClose = () => this.props.closeHandler();

  render() {
    const { error } = this.state;

    const { list } = this.props;

    return (
      <React.Fragment>
        <DialogTitle id="dialog-title">
          <div style={flexSpaceBetween}>
            Saved Databases
            <Button
              component={Link}
              to="/database/save"
              color="primary"
              variant="contained"
              size="small"
            >
              Save &raquo;
            </Button>
          </div>
        </DialogTitle>
        {error && (
          <DialogContent>
            <DialogContentText color="error" align="center">
              {error}
            </DialogContentText>
          </DialogContent>
        )}
        <DialogContent>
          <DialogContentText>
            Allows you to save your current database in a more{" "}
            <em>permanent</em> location, on the server.
          </DialogContentText>
        </DialogContent>

        <List>
          {list && list.length ? (
            list.map(database => (
              <DatabaseItem
                key={database._id}
                database={database}
                clickHandler={this.handleLoadDatabase}
                deleteHandler={this.handleDeleteDatabase}
              />
            ))
          ) : (
            <ListItem disabled>
              <ListItemText>No saved databases yet!</ListItemText>
            </ListItem>
          )}
        </List>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </React.Fragment>
    );
  }
}
