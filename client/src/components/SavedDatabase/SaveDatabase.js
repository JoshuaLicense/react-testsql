import React from "react";
//import PropTypes from 'prop-types';

import Button from "@material-ui/core/Button";

import Input from "@material-ui/core/Input";

import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

export default class SaveDatabase extends React.Component {
  state = {
    title: "",
    errors: {}
  };

  handleSaveDatabase = e => {
    return this.props
      .clickHandler(this.state.title)
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

    return (
      <React.Fragment>
        <DialogTitle>Save the current database</DialogTitle>
        <DialogContent>
          <FormControl
            error={Boolean(errors.title)}
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
            {errors.title && (
              <FormHelperText id="name-error-text">
                {errors.title.msg}
              </FormHelperText>
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
        </DialogActions>
      </React.Fragment>
    );
  }
}
