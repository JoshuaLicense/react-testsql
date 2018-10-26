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

const CustomizedContent = props => {
  const { depth, x, y, width, height, index, name } = props;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          stroke: "#fff",
          strokeWidth: 2 / (depth + 1e-10),
          strokeOpacity: 1 / (depth + 1e-10)
        }}
      />
      {depth === 1 ? (
        <React.Fragment>
          <text
            x={x + width / 2}
            y={y + height / 2 + 7}
            textAnchor="middle"
            fill="#fff"
            fontSize={14}
          >
            {name}
          </text>
          <text
            x={x + 4}
            y={y + 18}
            fill="#fff"
            fontSize={16}
            fillOpacity={0.9}
          >
            Q{index + 1}
          </text>
        </React.Fragment>
      ) : null}
    </g>
  );
};

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
      <ResponsiveContainer width="99%" height={280}>
        <Treemap
          data={data}
          dataKey="completed"
          nameKey="title"
          stroke="#fff"
          fill="#8884d8"
          isAnimationActive={false}
          content={<CustomizedContent />}
        >
          <Tooltip content={CustomTooltip} />
        </Treemap>
      </ResponsiveContainer>
    );
  }
}
