import React from "react";
//import PropTypes from 'prop-types';

import Button from "material-ui/Button";

import TextField from "material-ui/TextField";
import Dialog, {
  DialogActions,
  DialogTitle,
  DialogContent
} from "material-ui/Dialog";
import api from "../../utils/api";

class Guest extends React.Component {
  state = {
    currentTab: 0,
    open: false,

    username: "",
    password: ""
  };

  login = () => {
    const { username, password } = this.state;

    return api
      .login(username, password)
      .then(() => this.props.refreshUserContext());
  };

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  open = () => {
    this.setState({ open: true });
  };

  close = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button color="inherit" onClick={this.open}>
          Login
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.close}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Login</DialogTitle>
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
            <Button onClick={this.close} color="primary">
              Cancel
            </Button>
            <Button onClick={this.login} color="primary" variant="raised">
              Login
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default Guest;
