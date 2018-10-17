import React from "react";
import ResponsiveContainer from "recharts/lib/component/ResponsiveContainer";
import ScatterChart from "recharts/lib/chart/ScatterChart";
import Scatter from "recharts/lib/cartesian/Scatter";
import XAxis from "recharts/lib/cartesian/XAxis";
import YAxis from "recharts/lib/cartesian/YAxis";
import CartesianGrid from "recharts/lib/cartesian/CartesianGrid";
import Tooltip from "recharts/lib/component/Tooltip";

const CustomTooltip = props => {
  if (props.active) {
    const { payload } = props;

    return (
      <div className="custom-tooltip">
        <p className="label">{`${payload[1].value} : ${payload[0].value}`}</p>
        <p className="desc">Anything you want can be displayed here.</p>
      </div>
    );
  }

  return null;
};

export default class ScatterChartContainer extends React.PureComponent {
  render() {
    const { data } = this.props;

    return (
      <ResponsiveContainer width="99%" height={400}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 70 }}>
          <XAxis dataKey="0" angle={-45} textAnchor="end" />
          <YAxis dataKey="1" type="number" />
          <CartesianGrid />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            content={CustomTooltip}
          />
          <Scatter name="A school" data={data} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
    );
  }
}
