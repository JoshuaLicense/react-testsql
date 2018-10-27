import React from "react";

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
