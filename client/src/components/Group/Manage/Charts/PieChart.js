import React from "react";
import ResponsiveContainer from "recharts/lib/component/ResponsiveContainer";
import PieChart from "recharts/lib/chart/PieChart";
import Pie from "recharts/lib/polar/Pie";
import Cell from "recharts/lib/component/Cell";
import Tooltip from "recharts/lib/component/Tooltip";

import Typography from "@material-ui/core/Typography";

import stringToColor from "../stringToColor";

const style = {
  tooltip: {
    padding: ".5rem .75rem",
    backgroundColor: "rgba(255, 255, 255)",
    border: "2px solid rgba(0, 0, 0)"
  }
};

const CustomLabel = props => props.name;

const CustomTooltip = props => {
  if (props.active) {
    const { payload } = props;

    return (
      <div style={style.tooltip}>
        <Typography variant="body2" color="textPrimary">
          {payload[0].name}
        </Typography>
        <Typography>
          {`${payload[0].payload.label}:`} <strong>{payload[0].value}</strong>
        </Typography>
      </div>
    );
  }

  return null;
};

export default class PieChartContainer extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <ResponsiveContainer width="99%" height={500}>
        <PieChart>
          <Pie
            isAnimationActive={false}
            data={data}
            nameKey="set"
            dataKey="total"
            fill="#8884d8"
            innerRadius="70%"
            outerRadius="90%"
            label={CustomLabel}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                label="Total Questions"
                fill={stringToColor(entry.set)}
              />
            ))}
          </Pie>

          <Pie
            data={data}
            nameKey="set"
            dataKey="completed"
            fill="#82ca9d"
            outerRadius="60%"
            isAnimationActive={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                label="Completed Questions"
                fill={stringToColor(entry.set)}
              />
            ))}
          </Pie>
          <Tooltip content={CustomTooltip} />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
