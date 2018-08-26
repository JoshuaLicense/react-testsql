import React from "react";

import List from "@material-ui/core/List";

import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

import Button from "@material-ui/core/Button";

import Typography from "@material-ui/core/Typography";

import { loadDatabase, deleteDatabase } from "./API";

import DatabaseItem from "./DatabaseItem";

import Link from "react-router-dom/Link";
import ListItem from "@material-ui/core/ListItem";

const flexSpaceBetween = { display: "flex", justifyContent: "space-between" };

export default class DatabaseList extends React.Component {
  state = {
    error: null
  };

  handleLoadDatabase = id => {
    const { loadDatabaseHandler, closeHandler } = this.props;

    return loadDatabase(id)
      .then(fileBuffer => loadDatabaseHandler(new Uint8Array(fileBuffer)))
      .then(() => closeHandler())
      .catch(error => {
        error.json().then(json => this.setState({ error: json.message }));
      });
  };

  handleDeleteDatabase = id =>
    deleteDatabase(id)
      .then(this.props.refreshHandler)
      .catch(error => {
        error.json().then(json => this.setState({ error: json.message }));
      });

  handleClose = () => this.props.closeHandler();

  render() {
    const { error } = this.state;

    const { list } = this.props;

    return (
      <React.Fragment>
        {error && (
          <DialogTitle disableTypography>
            <Typography color="error" align="center">
              {error}
            </Typography>
          </DialogTitle>
        )}
        <DialogTitle id="dialog-title">
          <div style={flexSpaceBetween}>
            Saved Databases
            <Button
              component={Link}
              to="/database/save"
              color="primary"
              variant="raised"
              size="small"
            >
              Save &raquo;
            </Button>
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Allows you to save your current database in a more permanent
            location, the server.
          </DialogContentText>
        </DialogContent>

        <DialogContent>
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
              <ListItem disabled>No saved databases yet!</ListItem>
            )}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </React.Fragment>
    );
  }
}
