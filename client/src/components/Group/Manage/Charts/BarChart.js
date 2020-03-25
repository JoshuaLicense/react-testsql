import React from "react";
import ResponsiveContainer from "recharts/lib/component/ResponsiveContainer";
import BarChart from "recharts/lib/chart/BarChart";
import Bar from "recharts/lib/cartesian/Bar";
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

const CustomTooltip = props => {
  if (props.active) {
    const { payload, label } = props;

    return (
      <div style={style.tooltip}>
        <Typography variant="body1" color="textPrimary">
          {label}
        </Typography>
        <Typography>
          {`Total Completed:`} <strong>{payload[0].value}</strong>
        </Typography>
      </div>
    );
  }

  return null;
};

export default class BarChartContainer extends React.PureComponent {
  render() {
    const { data } = this.props;

    // Sort the users by completed questions.
    const sortedUsers = data.sort(
      (a, b) => a.questionsCompleted < b.questionsCompleted
    );

    return (
      <ResponsiveContainer width="99%" height={280}>
        <BarChart
          data={sortedUsers}
          margin={{ right: 20, bottom: 5 }}
          maxBarSize={10}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="username" />
          <YAxis
            dataKey="questionsCompleted"
            type="number"
            allowDecimals={false}
            label={{
              value: "# of Questions Completed",
              angle: -90,
              position: "center"
            }}
          />
          <Tooltip content={CustomTooltip} />
          <Bar
            name="Question"
            dataKey="questionsCompleted"
            isAnimationActive={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={stringToColor(entry.username)}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
