import React from "react";
import ResponsiveContainer from "recharts/lib/component/ResponsiveContainer";
import ScatterChart from "recharts/lib/chart/ScatterChart";
import Scatter from "recharts/lib/cartesian/Scatter";
import XAxis from "recharts/lib/cartesian/XAxis";
import YAxis from "recharts/lib/cartesian/YAxis";
import CartesianGrid from "recharts/lib/cartesian/CartesianGrid";
import Tooltip from "recharts/lib/component/Tooltip";
import Cell from "recharts/lib/component/Cell";

import Typography from "@material-ui/core/Typography";

import stringToColor from "../stringToColor";

const style = {
  tooltip: {
    padding: ".5rem .75rem",
    backgroundColor: "rgba(255, 255, 255)",
    border: "2px solid rgba(0, 0, 0)"
  }
};

const CustomXTick = label => `Q${label}`;

const CustomTooltip = props => {
  if (props.active) {
    const { payload } = props;

    return (
      <div style={style.tooltip}>
        <Typography
          variant="body1"
          color="textPrimary"
        >{`Question ${payload[0].value}`}</Typography>
        <Typography color="textSecondary" gutterBottom>
          {payload[0].payload.title}
        </Typography>
        <Typography>
          {`Total Completed:`} <strong>{payload[1].value}</strong>
        </Typography>
      </div>
    );
  }

  return null;
};

export default class ScatterChartContainer extends React.PureComponent {
  render() {
    const { data } = this.props;

    return (
      <ResponsiveContainer width="99%" height={500}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 15 }}>
          <XAxis dataKey="index" tickFormatter={CustomXTick} />
          <YAxis
            dataKey="completed"
            type="number"
            allowDecimals={false}
            label={{
              value: "# of Completed",
              angle: -90,
              position: "center"
            }}
          />
          <CartesianGrid />
          <Tooltip content={CustomTooltip} />
          <Scatter
            name="Question"
            data={data}
            shape="cross"
            isAnimationActive={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={stringToColor(entry.title)} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    );
  }
}
