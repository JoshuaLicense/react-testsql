import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import BarChartIcon from "@material-ui/icons/BarChart";
import PieChartIcon from "@material-ui/icons/PieChart";
import BubbleChartChartIcon from "@material-ui/icons/BubbleChart";
import ScatterChartIcon from "@material-ui/icons/ShowChart";

import BarChart from "./BarChart";
import ScatterChartContainer from "./ScatterChart";
import BubbleChart from "./BubbleChart";
import PieChart from "./PieChart";

export default class ChartManager extends React.Component {
  state = {
    index: 0
  };

  handleChange = (element, value) => this.setState({ index: value });

  render() {
    const { index } = this.state;

    const { questionMetrics, setMetrics } = this.props;

    return (
      <div>
        {index === 0 && (
          <BarChart data={questionMetrics.numberOfUsersCompleted} />
        )}
        {index === 1 && (
          <ScatterChartContainer
            data={questionMetrics.numberOfUsersCompleted}
          />
        )}
        {index === 2 && <BubbleChart />}
        {index === 3 && <PieChart data={setMetrics} />}
        <Tabs
          value={this.state.index}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          scrollButtons="auto"
          scrollable
        >
          <Tab icon={<BarChartIcon />} />
          <Tab icon={<ScatterChartIcon />} />
          <Tab icon={<BubbleChartChartIcon />} />
          <Tab icon={<PieChartIcon />} />
        </Tabs>
      </div>
    );
  }
}
