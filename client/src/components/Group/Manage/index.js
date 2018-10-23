import React from "react";

import Grid from "@material-ui/core/Grid";

import List from "@material-ui/core/List";
import DialogContent from "@material-ui/core/DialogContent";

// import DeleteIcon from "@material-ui/icons/Delete";
// import UpdateIcon from "@material-ui/icons/Edit";

// import Tile from "./Tile";

import Typography from "@material-ui/core/Typography";

import { Link } from "react-router-dom";

import { getGroup, updateGroup, removeUserFromGroup } from "../API";

import CloseIcon from "@material-ui/icons/Close";

import GroupUser from "../GroupUser";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import DialogContentText from "@material-ui/core/DialogContentText";

import ChartManager from "./Charts";

import "./manageGroup.css";

const style = {
  closeButton: { marginRight: 16 },
  flex: { flex: 1 }
};

export default class ManageGroup extends React.Component {
  state = {
    error: null,
    group: null,
    activeQuestionIndex: null
  };

  componentDidMount() {
    this.loadGroup();
  }

  handleUpdateGroup = async () => {
    const { id } = this.props.match.params;
    const { controlledTitle } = this.state;

    await updateGroup(id, controlledTitle);

    this.setState(prevState => ({
      group: { ...prevState.group, title: controlledTitle }
    }));
  };

  handleRemoveUser = async userId => {
    await removeUserFromGroup(this.props.match.params.id, userId);

    this.setState(prevState => ({
      group: {
        ...prevState.group,
        users: [...prevState.group.users.filter(user => user._id !== userId)]
      }
    }));
  };

  handleChange = e => this.setState({ controlledTitle: e.target.value });

  loadGroup = async () => {
    const { id } = this.props.match.params;

    try {
      const group = await getGroup(id);

      this.setState({ group, controlledTitle: group.title });
    } catch (response) {
      const error = await response.text();

      this.setState({ error });
    }
  };

  render() {
    const { title } = this.props.match.params;

    const { group, error } = this.state;

    if (!group) {
      return <div>Loading group information...</div>;
    }

    const { users, questionMetrics, setMetrics } = group;

    const header = (
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            component={Link}
            color="inherit"
            to="/"
            style={style.closeButton}
            aria-label="Close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="title" color="inherit" style={style.flex}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    );

    if (error) {
      return (
        <React.Fragment>
          {header}
          <DialogContent>
            <DialogContentText color="error" align="center">
              {error}
            </DialogContentText>
          </DialogContent>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        {header}

        <div style={{ margin: 16 }}>
          <Grid container spacing={16}>
            <Grid item xs={12} md={6} lg={8}>
              <Typography
                variant="body2"
                color="textSecondary"
                component="h3"
                gutterBottom
              >
                Chart
              </Typography>
              <Paper elevation={2}>
                <ChartManager
                  questionMetrics={questionMetrics}
                  setMetrics={setMetrics}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Typography
                variant="body2"
                color="textSecondary"
                component="h3"
                gutterBottom
              >
                Members
              </Typography>
              <Paper elevation={2}>
                <List
                  style={{ maxHeight: 368, overflow: "auto" }}
                  dense={users.length >= 5}
                  disablePadding
                >
                  {users.map(user => (
                    <GroupUser
                      key={user._id}
                      user={user}
                      dense={users.length >= 5}
                      removeHandler={this.handleRemoveUser}
                    />
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}
