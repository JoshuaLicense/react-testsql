import React from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

import { login } from "./API";

class Guest extends React.Component {
  state = {
    open: false,
    error: null,

    username: "",
    password: ""
  };

  handleLogin = async () => {
    const { username, password } = this.state;

    try {
      const user = await login(username, password);

      return this.props.loginHandler(user);
    } catch (response) {
      const error = await response.json();

      this.setState({ error });
    }
  };

  handleChange = event =>
    this.setState({ [event.target.id]: event.target.value });

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

  render() {
    const { error } = this.state;

    return (
      <React.Fragment>
        <Button color="inherit" onClick={this.handleOpen}>
          Login
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Login</DialogTitle>
          {error && (
            <Typography color="error" align="center">
              {error}
            </Typography>
          )}
          <DialogContent>
            <TextField
              type="text"
              id="username"
              label="Username"
              onChange={this.handleChange}
              margin="dense"
              autoFocus
              fullWidth
              required
            />
            <TextField
              type="password"
              id="password"
              label="Password"
              onChange={this.handleChange}
              margin="dense"
              fullWidth
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleLogin} color="primary" variant="raised">
              Login
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default Guest;
