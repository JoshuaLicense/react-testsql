import React from "react";

import IconButton from "@material-ui/core/IconButton";

import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";

import Input from "@material-ui/core/Input";

import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListSubheader from "@material-ui/core/ListSubheader";

import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

import DeleteIcon from "@material-ui/icons/Delete";
import RemoveUserIcon from "@material-ui/icons/RemoveCircle";
import UpdateIcon from "@material-ui/icons/Edit";

import Typography from "@material-ui/core/Typography";

import { Link, Redirect } from "react-router-dom";

import { getGroup, updateGroup, removeUserFromGroup } from "./API";

import Divider from "@material-ui/core/Divider";

const flexSpaceBetween = { display: "flex", justifyContent: "space-between" };

class ManageGroup extends React.Component {
  state = {
    group: null,
    controlledTitle: null,
    errors: null,
    redirect: null
  };

  componentDidMount = () => this.loadGroup();

  handleUpdateGroup = () => {
    const { id } = this.props.match.params;
    const { controlledTitle } = this.state;

    return updateGroup(id, controlledTitle).then(() => this.loadGroup());
  };

  handleRemoveUser = userId =>
    removeUserFromGroup(this.props.match.params.id, userId).then(() =>
      this.loadGroup()
    );

  handleChange = e => this.setState({ controlledTitle: e.currentTarget.value });

  loadGroup = () => {
    const { id } = this.props.match.params;

    return getGroup(id).then(group =>
      this.setState({ group, controlledTitle: group.title })
    );
  };

  render() {
    const { controlledTitle, group, errors } = this.state;

    if (!group) {
      return <div>Loading group information...</div>;
    }

    const { title, users } = group;

    return (
      <div>
        <DialogTitle
          id="dialog-title"
          style={flexSpaceBetween}
          disableTypography
        >
          <Typography variant="subheading" color="textSecondary">
            Managing: {title}
          </Typography>
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
          <Grid container spacing={24}>
            <Grid item xs={3}>
              <Typography align="right">Title</Typography>
            </Grid>
            <Grid item xs={9}>
              <FormControl
                error={Boolean(errors)}
                aria-describedby="title-error-text"
                fullWidth
              >
                <Input
                  id="title"
                  name="title"
                  value={controlledTitle}
                  onChange={this.handleChange}
                  margin="dense"
                  autoFocus
                  fullWidth
                />
                {errors &&
                  errors.title && (
                    <FormHelperText id="title-error-text">
                      {errors.title.msg}
                    </FormHelperText>
                  )}
              </FormControl>
            </Grid>
          </Grid>

          <DialogActions>
            <Button
              onClick={this.handleUpdateGroup}
              size="small"
              color="primary"
              variant="raised"
            >
              Update
              <UpdateIcon />
            </Button>
            <Button size="small" color="secondary" variant="raised">
              Delete
              <DeleteIcon />
            </Button>
          </DialogActions>
        </DialogContent>
        <Divider />
        <List subheader={<ListSubheader>All group users</ListSubheader>}>
          {users.map(user => (
            <GroupUser
              key={user._id}
              user={user}
              removeHandler={this.handleRemoveUser}
            />
          ))}
        </List>
        <DialogActions>
          <Button onClick={this.props.closeHandler} color="primary">
            Close
          </Button>
        </DialogActions>
      </div>
    );
  }
}

class GroupUser extends React.Component {
  handleRemoveUser = () => this.props.removeHandler(this.props.user._id);

  render() {
    const { user } = this.props;

    const { username, totalQuestions, questionsCompleted, canRemove } = user;

    return (
      <ListItem button>
        <Typography color="textSecondary">{`${questionsCompleted}/${totalQuestions}`}</Typography>
        <ListItemText inset primary={username} />
        {canRemove && (
          <ListItemSecondaryAction>
            <IconButton
              color="secondary"
              onClick={this.handleRemoveUser}
              aria-label="Remove User from the group"
            >
              <RemoveUserIcon />
            </IconButton>
          </ListItemSecondaryAction>
        )}
      </ListItem>
    );
  }
}

export default ManageGroup;
