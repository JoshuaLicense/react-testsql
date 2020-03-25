import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import BarChartIcon from "@material-ui/icons/BarChart";
import PieChartIcon from "@material-ui/icons/PieChart";
import ScatterChartIcon from "@material-ui/icons/ShowChart";
import TreemapIcon from "@material-ui/icons/ViewQuilt";

import BarChart from "./BarChart";
import ScatterChartContainer from "./ScatterChart";
import PieChart from "./PieChart";
import Treemap from "./Treemap";

export default class ChartManager extends React.Component {
  state = {
    index: 0
  };

  handleChange = (element, value) => this.setState({ index: value });

  render() {
    const { index } = this.state;

    const { questionMetrics, setMetrics, users } = this.props;

    return (
      <div>
        {index === 0 && <BarChart data={users} />}
        {index === 1 && <ScatterChartContainer data={questionMetrics} />}
        {index === 2 && <PieChart data={setMetrics} />}
        {index === 3 && <Treemap data={questionMetrics} />}
        <Tabs
          value={this.state.index}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          scrollButtons="auto"
          variant="scrollable"
        >
          <Tab icon={<BarChartIcon />} />
          <Tab icon={<ScatterChartIcon />} />
          <Tab icon={<PieChartIcon />} />
          <Tab icon={<TreemapIcon />} />
        </Tabs>
      </div>
    );
  }
}
