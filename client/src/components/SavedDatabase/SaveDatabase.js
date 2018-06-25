import React from "react";
//import PropTypes from 'prop-types';

import Button from "@material-ui/core/Button";

import Input from "@material-ui/core/Input";

import Redirect from "react-router-dom/Redirect";

import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";

import { saveDatabase } from "./API";

import { Link } from "react-router-dom";

const flexSpaceBetween = { display: "flex", justifyContent: "space-between" };

export default class SaveDatabase extends React.Component {
  state = {
    title: "",
    error: null
  };

  handleSaveDatabase = () => {
    const { title } = this.state;
    const { refreshHandler, currentDatabase } = this.props;

    const database = currentDatabase.export();

    return saveDatabase(title, database)
      .then(refreshHandler)
      .then(() => this.setState({ title: "", error: null, redirect: true }))
      .catch(error => {
        error.json().then(json => this.setState({ error: json.message }));
      });
  };

  handleChange = e => {
    this.setState({ title: e.target.value });
  };

  handleClose = () => this.props.closeHandler();

  render() {
    const { title, error, redirect } = this.state;

    if (redirect) {
      return <Redirect to="/" />;
    }

    const { currentSavedDatabaseCount } = this.props;

    return (
      <React.Fragment>
        <DialogTitle
          id="dialog-title"
          style={flexSpaceBetween}
          disableTypography
        >
          <Typography variant="title">Save your current database</Typography>
          <Button
            component={Link}
            color="secondary"
            variant="raised"
            size="small"
            to="/"
          >
            &laquo; Back
          </Button>
        </DialogTitle>
        <DialogContent>
          <FormControl
            error={Boolean(error)}
            aria-describedby="name-error-text"
            fullWidth
          >
            <Input
              id="name"
              placeholder="Please choose an identifiable title"
              value={title}
              onChange={this.handleChange}
              margin="dense"
              autoFocus
              fullWidth
            />
            {error && (
              <FormHelperText id="name-error-text">{error}</FormHelperText>
            )}
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            variant="raised"
            color="primary"
            onClick={this.handleSaveDatabase}
            disabled={
              currentSavedDatabaseCount && currentSavedDatabaseCount > 4
            }
          >
            Save ({currentSavedDatabaseCount}/5)
          </Button>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </React.Fragment>
    );
  }
}
