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

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

import Typography from "@material-ui/core/Typography";

import { Link } from "react-router-dom";

import { getGroup, updateGroup, removeUserFromGroup } from "./API";

import Divider from "@material-ui/core/Divider";

import CloseIcon from "@material-ui/icons/Close";

import GroupUser from "./GroupUser";
import { AppBar, Toolbar, IconButton, Paper } from "@material-ui/core";
import Section from "../Layout/Section";

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
    const { id, title } = this.props.match.params;

    const { group } = this.state;

    if (!group) {
      return <div>Loading group information...</div>;
    }

    const { users } = group;

    const allUsernames = users.map(user => user.username);

    const data = [
      { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
      { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
      { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
      { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
      { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
      { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
      { name: "Page G", uv: 3490, pv: 4300, amt: 2100 }
    ];

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
              Managing Group - {title}
            </Typography>
            <Button color="inherit" onClick={this.handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>

        <div style={{ padding: 16 }}>
          <Grid container spacing={16}>
            <Grid item xs={6} sm={4} md={3} lg={2}>
              <Paper elevation={2} className="tile">
                <div className="content">
                  <Typography variant="display4">4</Typography>
                  <Typography variant="title">Active Users</Typography>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={2}>
              <Paper elevation={2} className="tile">
                <div className="content">
                  <Typography variant="display4">15</Typography>
                  <Typography variant="title">Group Members</Typography>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={2}>
              <Paper elevation={2} className="tile">
                <div className="content">
                  <Typography variant="display4">22</Typography>
                  <Typography variant="title">Total Questions</Typography>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={2}>
              <Paper elevation={2} className="tile">
                <div className="content">
                  <Typography variant="display4">
                    11
                    <small style={{ fontSize: "0.5em" }}>%</small>
                  </Typography>
                  <Typography variant="title">Average Completion</Typography>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Typography variant="subheading">Chart</Typography>
              <BarChart
                width={600}
                height={300}
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
              </BarChart>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Typography variant="subheading">Group Members</Typography>
              <List>
                {users.map(user => (
                  <GroupUser
                    key={user._id}
                    user={user}
                    removeHandler={this.handleRemoveUser}
                  />
                ))}
              </List>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}
