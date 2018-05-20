import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import api from "../../utils/api";

import IconButton from "@material-ui/core/IconButton";

import Divider from "@material-ui/core/Divider";

import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";

import Checkbox from "@material-ui/core/Checkbox";

import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

import SQL from "sql.js";

import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

import Switch from "@material-ui/core/Switch";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import GroupIcon from "@material-ui/icons/GroupWork";
import DeleteIcon from "@material-ui/icons/Delete";
import LeaveIcon from "@material-ui/icons/ExitToApp";
import ManageIcon from "@material-ui/icons/Settings";
import LockIcon from "@material-ui/icons/Lock";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import AddIcon from "@material-ui/icons/Add";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

class CreateGroup extends React.Component {
  state = {
    name: "",
    isPrivate: false,
    errors: null
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleChecked = e => {
    this.setState({ [e.target.id]: e.target.checked });
  };

  render() {
    const { name, isPrivate, errors } = this.state;

    return (
      <div>
        <DialogTitle id="dialog-title">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            Creating a new group
            <Button
              component={Link}
              color="secondary"
              variant="raised"
              size="small"
              to="/"
            >
              &laquo; Back
            </Button>
          </div>
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
              <FormControl
                error={Boolean(errors)}
                aria-describedby="group-database-help-text"
                fullWidth
              >
                <input type="file" id="groupDatabase" />
                <FormHelperText id="group-database-help-text">
                  The database that will users of the group will get questions
                  generated from.
                </FormHelperText>
                {errors &&
                  errors.database && (
                    <FormHelperText id="group-database-error-text">
                      {errors.database.msg}
                    </FormHelperText>
                  )}
              </FormControl>
            </Grid>
          </Grid>
          {/*<Grid container spacing={8}>
            <Grid item xs={3} />
            <Grid item xs={9}>
              <FormControl
                error={Boolean(errors)}
                aria-describedby="group-database-error-text"
                fullWidth
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isPrivate}
                      onChange={this.handleChecked}
                      id="isPrivate"
                      value="true"
                    />
                  }
                  label="Private?"
                />
                {errors &&
                  errors.visibility && (
                    <FormHelperText id="group-database-error-text">
                      {errors.visibility.msg}
                    </FormHelperText>
                  )}
              </FormControl>
            </Grid>
          </Grid>*/}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.props.closeHandler}
            color="primary"
            variant="raised"
          >
            Create
          </Button>
        </DialogActions>
      </div>
    );
  }
}

class GroupItem extends React.Component {
  handleJoinGroup = () => this.props.joinGroupHandler(this.props.item._id);
  handleLeaveGroup = () => this.props.leaveGroupHandler(this.props.item._id);

  render() {
    const {
      title,
      createdAt,
      capacity,
      createdBy,
      isPrivate
    } = this.props.item;

    const { canManage, canLeave } = this.props;

    const date = new Date(createdAt).toDateString();

    return (
      <ListItem onClick={this.handleJoinGroup} button>
        <ListItemText inset primary={title} secondary={createdBy} />
        <ListItemSecondaryAction>
          {canManage && (
            <IconButton aria-label="Manage group">
              <ManageIcon />
            </IconButton>
          )}
          {canLeave && (
            <IconButton
              onClick={this.handleLeaveGroup}
              aria-label="Leave group"
            >
              <LeaveIcon />
            </IconButton>
          )}
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

class GroupList extends React.Component {
  state = {
    activeList: null,
    list: null,
    error: null
  };

  load = async () => {
    await api
      .listActiveGroups()
      .then(activeList => this.setState({ activeList }))
      .catch(error => {
        error.json().then(json => this.setState({ error: json.message }));
      });

    return api
      .listGroups()
      .then(list => {
        this.setState({ list });
      })
      .catch(error => {
        error.json().then(json => this.setState({ error: json.message }));
      });
  };

  handleClose = () => {
    this.props.closeHandler();

    // Remove any errors from the modal.
    this.setState({ error: null });
  };

  componentDidMount = () => this.load();

  handleJoinGroup = id => {
    this.setState({ error: null });

    api
      .joinGroup(id)
      .then(group => api.loadDatabase(group.database))
      .then(fileBuffer => {
        const typedArray = new Uint8Array(fileBuffer);

        const database = new SQL.Database(typedArray);

        return this.props.loadDatabaseHandler(database);
      })
      .then(() => this.props.closeHandler())
      .catch(error => {
        error.json().then(json => this.setState({ error: json.message }));
      });
  };

  handleLeaveGroup = id => {
    this.setState({ error: null });

    api
      .leaveGroup(id)
      .then(() => this.load())
      .catch(error => {
        error.json().then(json => this.setState({ error: json.message }));
      });
  };

  render() {
    const { list, activeList, error } = this.state;

    const listCount = list && list.length;
    const activeListCount = activeList && activeList.length;

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
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            Your active groups
            <Button
              component={Link}
              to="/create-group"
              color="primary"
              variant="raised"
              size="small"
            >
              Create &raquo;
            </Button>
          </div>
        </DialogTitle>
        {activeListCount > 0 ? (
          <List dense={activeListCount >= 5}>
            {activeList.map(activeGroup => (
              <GroupItem
                key={activeGroup.group._id}
                joinGroupHandler={this.handleJoinGroup}
                leaveGroupHandler={this.handleLeaveGroup}
                item={activeGroup.group}
                canManage
                canLeave
              />
            ))}
          </List>
        ) : (
          <DialogContent>
            <DialogContentText>
              You are not the owner of any groups!
            </DialogContentText>
          </DialogContent>
        )}
        <DialogTitle id="dialog-title">All Available Groups</DialogTitle>
        {listCount > 0 ? (
          <List dense={listCount >= 5}>
            {list.map(group => (
              <GroupItem
                key={group._id}
                joinGroupHandler={this.handleJoinGroup}
                item={group}
              />
            ))}
          </List>
        ) : (
          <DialogContent>
            <DialogContentText>No groups available!</DialogContentText>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={this.props.closeHandler} color="primary">
            Close
          </Button>
        </DialogActions>
      </React.Fragment>
    );
  }
}

class GroupManager extends React.Component {
  state = {
    open: false
  };

  open = () => {
    this.setState({ open: true });
  };

  close = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;

    const { loadDatabaseHandler } = this.props;

    return (
      <React.Fragment>
        <IconButton color="inherit" aria-label="Group List" onClick={this.open}>
          <GroupIcon />
        </IconButton>

        <Router>
          <Dialog fullWidth onClose={this.close} open={open}>
            <Route
              exact
              path="/"
              render={() => (
                <GroupList
                  loadDatabaseHandler={loadDatabaseHandler}
                  closeHandler={this.close}
                />
              )}
            />
            <Route path="/create-group" render={() => <CreateGroup />} />
          </Dialog>
        </Router>
      </React.Fragment>
    );
  }
}

export default GroupManager;
