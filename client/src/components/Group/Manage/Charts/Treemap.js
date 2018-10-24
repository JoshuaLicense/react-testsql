import React from "react";
import ResponsiveContainer from "recharts/lib/component/ResponsiveContainer";
import Treemap from "recharts/lib/chart/Treemap";
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

const CustomXTick = label => `Q${label}`;

const CustomTooltip = props => {
  if (props.active) {
    const { payload } = props;

    return (
      <div style={style.tooltip}>
        <Typography variant="body2" color="textPrimary">{`Question ${payload[0]
          .payload.index + 1}`}</Typography>
        <Typography color="textSecondary" gutterBottom>
          {payload[0].name}
        </Typography>
        <Typography>
          {`Total Completed:`} <strong>{payload[0].value}</strong>
        </Typography>
      </div>
    );
  }

  return null;
};

export default class TreemapContainer extends React.PureComponent {
  render() {
    const { data } = this.props;

    return (
      <ResponsiveContainer width="99%" height={300}>
        <Treemap
          data={data}
          dataKey="completed"
          nameKey="title"
          stroke="#fff"
          fill="#8884d8"
          isAnimationActive={false}
        >
          <Tooltip content={CustomTooltip} />
        </Treemap>
      </ResponsiveContainer>
    );
  }
}
