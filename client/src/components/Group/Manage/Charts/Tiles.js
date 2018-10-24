import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import BarChartIcon from "@material-ui/icons/BarChart";
import PieChartIcon from "@material-ui/icons/PieChart";
import ScatterChartIcon from "@material-ui/icons/ShowChart";
import TreemapIcon from "@material-ui/icons/ViewQuilt";

import BarChart from "./BarChart";
import PieChart from "./PieChart";
import Treemap from "./Treemap";
import { Grid } from "@material-ui/core";

export default class ChartManager extends React.Component {
  render() {
    const { questionMetrics, setMetrics, users } = this.props;

    return (
      <Grid container>
        <Grid item xs={12}>
          <BarChart data={users} />
        </Grid>
        <Grid item xs={12} sm={6} xl={3}>
          <PieChart data={setMetrics} />
        </Grid>
        <Grid item xs={12} sm={6} xl={3}>
          <Treemap data={questionMetrics} />
        </Grid>
      </Grid>
    );
  }
}
