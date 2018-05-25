import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import api from "../../utils/api";

import IconButton from "@material-ui/core/IconButton";

import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";

import Input from "@material-ui/core/Input";

import SQL from "sql.js";

import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
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

import CurrentIcon from "@material-ui/icons/StarBorder";

import Typography from "@material-ui/core/Typography";

import Select from "@material-ui/core/Select";

import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const flexSpaceBetween = { display: "flex", justifyContent: "space-between" };

class CreateGroup extends React.Component {
  state = {
    errors: null,
    databaseList: null,

    name: "",
    selectedDatabase: ""
  };

  componentDidMount = () =>
    api.listDatabases().then(list => this.setState({ databaseList: list }));

  handleSubmit = () => {
    const { name, selectedDatabase } = this.state;

    return api
      .createGroup(name, selectedDatabase)
      .then(() => this.props.closeHandler())
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
    const { name, errors, databaseList, selectedDatabase } = this.state;

    return (
      <div>
        <DialogTitle id="dialog-title">
          <div style={flexSpaceBetween}>
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
                  {databaseList &&
                    databaseList.map(database => (
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
          <Button onClick={this.handleSubmit} color="primary" variant="raised">
            Create
          </Button>
        </DialogActions>
      </div>
    );
  }
}

class GroupItem extends React.Component {
  handleJoinGroup = () => this.props.joinGroupHandler(this.props.id);
  handleLeaveCurrentGroup = () =>
    this.props.leaveCurrentGroupHandler(this.props.id);
  handleLeaveGroup = () => this.props.leaveGroupHandler(this.props.id);

  render() {
    const { title, canManage, canLeave, isCurrent } = this.props;

    return (
      <ListItem onClick={this.handleJoinGroup} button>
        {isCurrent && (
          <ListItemIcon>
            <CurrentIcon />
          </ListItemIcon>
        )}
        <ListItemText inset primary={title} />
        <ListItemSecondaryAction>
          {canManage && (
            <IconButton aria-label="Manage group">
              <ManageIcon />
            </IconButton>
          )}
          {isCurrent ? (
            <IconButton
              color="secondary"
              onClick={this.handleLeaveCurrentGroup}
              aria-label="Leave current group"
            >
              <LeaveIcon />
            </IconButton>
          ) : (
            canLeave && (
              <IconButton
                onClick={this.handleLeaveGroup}
                aria-label="Leave group"
              >
                <DeleteIcon />
              </IconButton>
            )
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
      .then(() => this.props.refreshUserContext())
      .catch(error => {
        error.json().then(json => this.setState({ error: json.message }));
      });
  };

  handleCurrentLeaveGroup = id => {
    this.setState({ error: null });

    api
      .leaveCurrentGroup()
      .then(() => this.load())
      .then(() => this.props.refreshUserContext())
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

    const { currentGroup } = this.props;

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
          <div style={flexSpaceBetween}>
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
            {activeList.map(activeUserGroup => (
              <GroupItem
                key={activeUserGroup.group._id}
                id={activeUserGroup.group._id}
                title={activeUserGroup.group.title}
                joinGroupHandler={this.handleJoinGroup}
                leaveCurrentGroupHandler={this.handleCurrentLeaveGroup}
                leaveGroupHandler={this.handleLeaveGroup}
                isCurrent={
                  currentGroup && activeUserGroup.group._id === currentGroup._id
                }
                canManage
                canLeave
              />
            ))}
          </List>
        ) : (
          <DialogContent>
            <DialogContentText>
              You do not have any active groups!
            </DialogContentText>
          </DialogContent>
        )}
        <DialogTitle id="dialog-title">All Available Groups</DialogTitle>
        {listCount > 0 ? (
          <List dense={listCount >= 5}>
            {list.map(group => (
              <GroupItem
                key={group._id}
                id={group._id}
                title={group.title}
                joinGroupHandler={this.handleJoinGroup}
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

    const {
      currentGroup,
      loadDatabaseHandler,
      refreshUserContext
    } = this.props;

    return (
      <React.Fragment>
        <IconButton
          color={currentGroup ? "secondary" : "inherit"}
          aria-label="Group List"
          onClick={this.open}
        >
          <GroupIcon />
        </IconButton>

        <Router>
          <Dialog fullWidth onClose={this.close} open={open}>
            <Route
              exact
              path="/"
              render={() => (
                <GroupList
                  currentGroup={currentGroup}
                  refreshUserContext={refreshUserContext}
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
