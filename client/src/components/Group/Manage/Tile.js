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

export default class Tile extends React.Component {
  render() {
    const { number, title, color, backgroundColor } = this.props;

    return (
      <Paper elevation={2} className="tile" style={{ backgroundColor }}>
        <div className="content">
          <Typography variant="h1" style={{ color }}>
            {number}
          </Typography>
          <Typography variant="h6">{title}</Typography>
        </div>
      </Paper>
    );
  }
}
