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

import { Link } from "react-router-dom";

const flexSpaceBetween = { display: "flex", justifyContent: "space-between" };

export default class DatabaseList extends React.Component {
  state = {
    error: null
  };

  handleLoadDatabase = id => {
    return loadDatabase(id)
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
    deleteDatabase(id).then(() => this.refreshSavedDatabaseList());

  render() {
    const { error } = this.state;

    const { list, dense } = this.props;

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
        <DialogTitle id="dialog-title">
          <div style={flexSpaceBetween}>
            Saved Databases
            <Button
              component={Link}
              to="/database/create"
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
        {count > 0 ? (
          <List dense={Boolean(dense)}>
            {list.map(database => (
              <DatabaseItem
                key={database._id}
                database={database}
                clickHandler={this.handleLoadDatabase}
                deleteHandler={this.handleDeleteDatabase}
              />
            ))}
          </List>
        ) : (
          <DialogContent>
            <DialogContentText>No saved databases yet!</DialogContentText>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </React.Fragment>
    );
  }
}
