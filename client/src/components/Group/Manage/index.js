import React from "react";

import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";

import Red from "@material-ui/core/colors/red";
import Green from "@material-ui/core/colors/green";

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

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

import Tile from "./Tile";

import Typography from "@material-ui/core/Typography";

import { Link } from "react-router-dom";

import { getGroup, updateGroup, removeUserFromGroup } from "../API";

import Divider from "@material-ui/core/Divider";

import CloseIcon from "@material-ui/icons/Close";

import GroupUser from "../GroupUser";
import { AppBar, Toolbar, IconButton, Paper } from "@material-ui/core";
import Section from "../../Layout/Section";

import ChartManager from "./Charts";

import "./manageGroup.css";

const flexSpaceBetween = { display: "flex", justifyContent: "space-between" };

const style = {
  closeButton: { marginRight: 16 },
  flex: { flex: 1 }
};

export default class ManageGroup extends React.Component {
  state = {
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

    const group = await getGroup(id);

    this.setState({ group, controlledTitle: group.title });
  };

  render() {
    const { id, title } = this.props.match.params;

    const { group } = this.state;

    if (!group) {
      return <div>Loading group information...</div>;
    }

    const {
      users,
      averagePercentageComplete,
      totalQuestions,
      questionMetrics,
      setMetrics
    } = group;

    const numberOfUsers = users.length;

    // Extract the number of active users in the group set.
    const numberOfActiveUsers = users.reduce(
      (acc, curr) => (acc += Number(curr.active || 0)),
      0
    );

    const roundedAverage = Math.round(averagePercentageComplete);
    const colorCodedAverageText =
      roundedAverage < 20
        ? Red[500]
        : roundedAverage > 80
          ? Green[500]
          : "inherit";

    const colorCodedAverageBackground =
      roundedAverage < 20
        ? Red[100]
        : roundedAverage > 80
          ? Green[100]
          : "inherit";

    return (
      <React.Fragment>
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
                  disablePadding
                >
                  {users.map(user => (
                    <GroupUser
                      key={user._id}
                      user={user}
                      removeHandler={this.handleRemoveUser}
                    />
                  ))}
                  {users.map(user => (
                    <GroupUser
                      key={user._id}
                      user={user}
                      removeHandler={this.handleRemoveUser}
                    />
                  ))}
                  {users.map(user => (
                    <GroupUser
                      key={user._id}
                      user={user}
                      removeHandler={this.handleRemoveUser}
                    />
                  ))}
                  {users.map(user => (
                    <GroupUser
                      key={user._id}
                      user={user}
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
