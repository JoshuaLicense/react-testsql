import React from "react";

import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";

import Input from "@material-ui/core/Input";

import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";

import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

import DeleteIcon from "@material-ui/icons/Delete";
import UpdateIcon from "@material-ui/icons/Edit";

import Typography from "@material-ui/core/Typography";

import { Link } from "react-router-dom";

import { getGroup, updateGroup, removeUserFromGroup } from "./API";

import Divider from "@material-ui/core/Divider";

import GroupUser from "./GroupUser";

const flexSpaceBetween = { display: "flex", justifyContent: "space-between" };

class ManageGroup extends React.Component {
  state = {
    group: null,
    controlledTitle: null,
    error: null
  };

  componentDidMount = () => this.loadGroup();

  handleUpdateGroup = () => {
    const { id } = this.props.match.params;
    const { controlledTitle } = this.state;

    return updateGroup(id, controlledTitle).then(() =>
      this.setState(prevState => ({
        group: { ...prevState.group, title: controlledTitle }
      }))
    );
  };

  handleRemoveUser = userId =>
    removeUserFromGroup(this.props.match.params.id, userId).then(() =>
      this.setState(prevState => ({
        group: {
          ...prevState.group,
          users: [...prevState.group.users.filter(user => user._id !== userId)]
        }
      }))
    );

  handleChange = e => this.setState({ controlledTitle: e.target.value });

  loadGroup = () => {
    const { id } = this.props.match.params;

    return getGroup(id)
      .then(group => this.setState({ group, controlledTitle: group.title }))
      .catch(error => {
        error.json().then(json => this.setState({ error: json.message }));
      });
  };

  render() {
    const { controlledTitle, group, error } = this.state;

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
                error={Boolean(error)}
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
                {error && (
                  <FormHelperText id="title-error-text">{error}</FormHelperText>
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

export default ManageGroup;
