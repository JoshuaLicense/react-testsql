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
    error: null,
    list: null,

    name: "",
    selectedDatabase: "",
    redirect: false
  };

  componentDidMount = () =>
    listDatabases().then(list => this.setState({ list }));

  handleSubmit = async () => {
    const { name, selectedDatabase } = this.state;

    try {
      await createGroup(name, selectedDatabase);

      this.setState({ redirect: true });
    } catch (response) {
      const error = await response.text();

      this.setState({ error });
    }
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { name, error, list, selectedDatabase, redirect } = this.state;

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
          <Typography variant="h6">Creating a new group</Typography>
          <Button
            component={Link}
            color="secondary"
            variant="contained"
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
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Typography align="right">Group Name</Typography>
            </Grid>
            <Grid item xs={9}>
              <FormControl
                error={Boolean(error)}
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
                {error && (
                  <FormHelperText id="name-error-text">{error}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <Typography align="right">Shared Database</Typography>
            </Grid>
            <Grid item xs={9}>
              <FormControl fullWidth>
                <Select
                  value={selectedDatabase}
                  onChange={this.handleChange}
                  inputProps={{
                    name: "selectedDatabase",
                    id: "selectedDatabase"
                  }}
                  fullWidth
                >
                  {list && list.length ? (
                    list.map(database => (
                      <MenuItem key={database._id} value={database._id}>
                        {database.title}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>
                      <em>No saved databases!</em>
                    </MenuItem>
                  )}
                </Select>
                <FormHelperText>
                  This will list all of your saved databases.
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.closeHandler} color="primary">
            Close
          </Button>
          <Button
            onClick={this.handleSubmit}
            color="primary"
            variant="contained"
          >
            Create
          </Button>
        </DialogActions>
      </div>
    );
  }
}

export default CreateGroup;
