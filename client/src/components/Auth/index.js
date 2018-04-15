import React from "react";
//import PropTypes from 'prop-types';

import Button from "material-ui/Button";

import TextField from "material-ui/TextField";
import Dialog, {
  DialogActions,
  DialogTitle,
  DialogContent
} from "material-ui/Dialog";

class Auth extends React.Component {
  state = {
    currentTab: 0,
    open: false,

    username: "",
    password: ""
  };

  login = e => {
    const { username, password } = this.state;

    const data = { username, password };

    fetch("/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(response => response.json())
      .catch(error => console.error("Error:", error))
      .then(response => console.log("Success:", response));
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

export default Auth;
