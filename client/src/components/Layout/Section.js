import React from "react";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const style = {
  heading: {
    fontWeight: 500
  },
  seperator: {
    margin: "16px"
  },
  paper: {
    overflow: "auto"
  },
  gutters: {
    padding: "16px"
  }
};

const Section = props => {
  const { title, children, padding = 0, ...other } = props;

  const paperStyle = { ...style.paper, padding };

  return (
    <div style={style.seperator} {...other}>
      <Typography
        variant="body2"
        color="textSecondary"
        component="h3"
        gutterBottom
      >
        {title}
      </Typography>
      <Paper style={paperStyle} elevation={2} square>
        {children}
      </Paper>
    </div>
  );
};

export default Section;
