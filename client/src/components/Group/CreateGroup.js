import React from "react";

import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";

import Input from "@material-ui/core/Input";

import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import Typography from "@material-ui/core/Typography";

import Select from "@material-ui/core/Select";

import MenuItem from "@material-ui/core/MenuItem";

import { Link, Redirect } from "react-router-dom";

import { createGroup } from "./API";

import { listDatabases } from "../SavedDatabase/API";

const flexSpaceBetween = { display: "flex", justifyContent: "space-between" };

class CreateGroup extends React.Component {
  state = {
    errors: null,
    list: null,

    name: "",
    selectedDatabase: "",
    redirect: false
  };

  componentDidMount = () =>
    listDatabases().then(list => this.setState({ list }));

  handleSubmit = () => {
    const { name, selectedDatabase } = this.state;

    return createGroup(name, selectedDatabase)
      .then(() => this.setState({ redirect: true }))
      .catch(error => {
        error.json().then(json => this.setState({ error: json.message }));
      });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { name, errors, list, selectedDatabase, redirect } = this.state;

    if (redirect) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <DialogTitle
          id="dialog-title"
          style={flexSpaceBetween}
          disableTypography
        >
          <Typography variant="title">Creating a new group</Typography>
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
          <DialogContentText>
            A group allows others to join and share a common database allowing
            the group owner to customize and track their user's experience.
          </DialogContentText>
        </DialogContent>
        <DialogContent>
          <Grid container spacing={24}>
            <Grid item xs={3}>
              <Typography align="right">Name</Typography>
            </Grid>
            <Grid item xs={9}>
              <FormControl
                error={Boolean(errors)}
                aria-describedby="name-error-text"
                fullWidth
              >
                <Input
                  id="name"
                  name="name"
                  value={name}
                  onChange={this.handleChange}
                  margin="dense"
                  autoFocus
                  fullWidth
                />
                {errors &&
                  errors.name && (
                    <FormHelperText id="name-error-text">
                      {errors.name.msg}
                    </FormHelperText>
                  )}
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <Typography align="right">Group Database</Typography>
            </Grid>
            <Grid item xs={9}>
              <FormControl style={{ width: "100%" }}>
                <Select
                  value={selectedDatabase}
                  onChange={this.handleChange}
                  inputProps={{
                    name: "selectedDatabase",
                    id: "selectedDatabase"
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {list &&
                    list.map(database => (
                      <MenuItem key={database._id} value={database._id}>
                        {database.title}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.closeHandler} color="primary">
            Close
          </Button>
          <Button onClick={this.handleSubmit} color="primary" variant="raised">
            Create
          </Button>
        </DialogActions>
      </div>
    );
  }
}

export default CreateGroup;
